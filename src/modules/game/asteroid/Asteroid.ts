export default class Asteroid extends PIXI.Container {
    private _id: number;
    private _asteroid: PIXI.Sprite;
    private _direction: boolean;
    private _ticker = new PIXI.Ticker();
    private _inverse = false;
    private _speed = 0.2 + Math.random() * 0.03;
    
    constructor(id: number) {
        super();
        this._id = id;
        this._direction = Math.floor(Math.random() * 2) === 0;
        this._asteroid = PIXI.Sprite.from('asteroid.png');
        this.addChild(this._asteroid);

        this._ticker.add(this._update.bind(this));
        this._ticker.start();
    }

    destroy() {
        this._ticker.stop();
        this._ticker.destroy();
        this.removeChild(this._asteroid);
        this._asteroid.destroy();
    }

    private _update() {
        this._inverse ? this.y += this._speed : this.y -= this._speed;
        if (this.y <= 0 || this.y > 200) this._inverse = !this._inverse; 
    }

    get direction(): boolean {
        return this._direction;
    }

    set direction(value: boolean) {
        this._direction = value;
    } 

    get id() {
        return this._id;
    }
}