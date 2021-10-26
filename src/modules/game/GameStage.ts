import { Container } from 'pixi.js';
import config from '../../config';
import { testForAABB } from '../../helpers';
import Asteroid from './asteroid/Asteroid';
import Background from './back/Background';
import Bomb from './ship/Bomb';
import Ship from './ship/Ship';
import BarGameProgress from './ui/BarGameProgress';
import EndPanel from './ui/EndPanel';

export default class GameStage extends Container {
    private _bomb_count = 10;
    private _game_time = 60;
    private _ticker = new PIXI.Ticker();
    private _move_speed: number = 10;
    private _asteroid_speed: number = 0.5;
    private _bombSpeed: number = 10;
    private _bombDt: number = 0;
    
    private _ship = new Ship();
    private _bombs: Bomb[] = [];

    private _asteroids: Asteroid[] = [];

    private _endPanel = new EndPanel();

    private _gameProgress: BarGameProgress;

    private _keyState = {
        left: false,
        right: false,
    }
    constructor() {
        super();

        const back = new Background();
        this.addChild(back);

        this._ship.position.set(
            config.WIDTH / 2 - this._ship.width / 2,
            config.HEIGHT - this._ship.height - 10
        );
        this.addChild(this._ship);

        for (let i = 0; i < 5; i++) {
            const asteroid = new Asteroid(i);
            asteroid.y = Math.random() * 150;
            asteroid.x = i * config.WIDTH / 5
            this.addChild(asteroid);
            this._asteroids.push(asteroid)
        }

        this._gameProgress = new BarGameProgress(this._bomb_count, this._game_time);
        this._gameProgress.on('GameProgress.EndTime', () => {
            this._endGame(false);
        });
        this._gameProgress.y = config.HEIGHT - this._gameProgress.height - 10;
        this.addChild(this._gameProgress);
        
        this.addChild(this._endPanel);

        this._ticker.add(this.update.bind(this));
        this._ticker.start();

        document.addEventListener('keydown', this._onKeyDown.bind(this));
        document.addEventListener('keyup', this._onKeyUp.bind(this));
    }

    private _onKeyUp(e: KeyboardEvent) {
        if (this._endPanel.visible) {
            return;
        }

        switch ( e.code ) {
            case 'ArrowLeft': {
                this._keyState.left = false;
                break;
                
            }
            case 'ArrowRight': {
                this._keyState.right = false;
                break;
                
            }
        }
    }

    private _onKeyDown(e: KeyboardEvent) {
        if (this._endPanel.visible) {
            return;
        }

        switch ( e.code ) {
            case 'ArrowLeft': {
                this._keyState.left = true;
                break;
            }
            case 'ArrowRight': {
                this._keyState.right = true;
                break;
            }
            case 'Space': {
                this.shipFire();
                break;
            }
        }
    }

    shipFire() {
        if (this._bombDt !== 0 || this._bomb_count === 0) {
            return;
        }
        this._bombDt = 2;

        const bomb = new Bomb(10);
        bomb.x = this._ship.x + this._ship.width / 2;
        bomb.y = this._ship.y - bomb.height;
        this.addChild(bomb);
        this._bombs.push(bomb);

        this._bomb_count--;
        this._gameProgress.decBomb();
    }

    update() {
        for (let i = 0; i < this._asteroids.length; i++) {
            const asteroid = this._asteroids[i];
            let nx = asteroid.x + (asteroid.direction ? this._asteroid_speed : -this._asteroid_speed);
            if (nx < 0) {
                asteroid.direction = !asteroid.direction;
                 nx = 0;
            }
            if (nx + asteroid.width > config.WIDTH) {
                asteroid.direction = !asteroid.direction;
                nx = config.WIDTH - asteroid.width;
            } 
            asteroid.x = nx;

        }

        for (let i = 0; i < this._asteroids.length; i++) {
            const asteroid = this._asteroids[i];
            for (let j = 0; j < this._asteroids.length; j++) {
                if (asteroid.id !== this._asteroids[j].id) {
                    if (testForAABB(asteroid, this._asteroids[j])) {
                        asteroid.direction = !asteroid.direction;
                    }
                }
            }
        }

        this._bombDt -= 0.1;
        if (this._bombDt < 0) {
            this._bombDt = 0;
        }
        for (let i = 0; i < this._bombs.length; i++) {
            this._bombs[i].y -= this._bombSpeed;
            if (this._bombs[i].y + this._bombs[i].height < 0) {
                this._destroyObject(i, this._bombs);
            }
        }

        for (let i = 0; i < this._bombs.length; i++) {
            const bomb = this._bombs[i];
            for (let j = 0; j < this._asteroids.length; j++) {
                const asteroid = this._asteroids[j];
                if (testForAABB(bomb, asteroid)) {
                    bomb.visible = false;
                    this._destroyObject(j, this._asteroids);
                }
            }
        }

        this._checkMoveShip();

        this._checkEndGame();
    }

    private _checkMoveShip() {
        if (this._keyState.left && this._keyState.right || !this._keyState.left && !this._keyState.right) {
            return;
        }

        let nx = this._ship.x + (this._keyState.left ? -this._move_speed : this._move_speed);
        if (nx < 0) nx = 0;
        if (nx + this._ship.width > config.WIDTH) nx = config.WIDTH - this._ship.width;
        this._ship.x = nx;
    }

    private _checkEndGame() {
        
        if (this._asteroids.length === 0) {
            this._endGame(true);
        }

        if (this._bomb_count === 0 && this._bombs.length === 0) {
            this._endGame(false);
        }
    }

    private _endGame(isWin: boolean) {
        if (this._endPanel.visible) {
            return;
        }
        document.removeEventListener('keydown', this._onKeyDown.bind(this));
        document.removeEventListener('keyup', this._onKeyDown.bind(this));
        this._gameProgress.stop();
        this._ticker.stop();
        this._endPanel.show(isWin);
    }

    private _destroyObject(index: number, ar: any) {
        const item = ar[index];
        ar.splice(index, 1);
        this.removeChild(item);
        item.destroy();
    }



}