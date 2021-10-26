import config from "../../../config";
import { gsapTimer } from "../../../helpers";

export default class BarGameProgress extends PIXI.Container {
    private _txtBombCount: PIXI.Text;
    private _txtTime: PIXI.Text;

    private _bombCount: number;
    private _seconds: number;
    
    private _state: string = 'game';

    constructor(bombCount: number, seconds: number) {
        super();
        this._bombCount = bombCount;
        this._seconds = seconds;

        const style = new PIXI.TextStyle({
            fontSize: 30,
            fill: 0xffffff
        });
        this._txtBombCount = new PIXI.Text(`${this._bombCount} bombs`, style);
        this._txtBombCount.x = 10;
        this.addChild(this._txtBombCount);

        this._txtTime = new PIXI.Text(`Time: ${seconds}`, style);
        this._txtTime.x = config.WIDTH - this._txtTime.width - 10;
        this.addChild(this._txtTime);

        gsapTimer({ fast: 1, normal: 1}, () => {
            this._decTime();
        })
    }

    stop() {
        this._state = 'stop';
    }

    decBomb() {
        this._bombCount--;
        this._txtBombCount.text = this._bombCount.toFixed() + ' bombs';
    }

    private _decTime() {
        if (this._state !== 'game') {
            return;
        }
        this._seconds--;
        this._txtTime.text = 'Time: ' + this._seconds.toFixed();
        this._txtTime.x = config.WIDTH - this._txtTime.width - 10;

        if (this._seconds !== 0) {
            gsapTimer({ fast: 1, normal: 1}, () => {
                this._decTime();
            })
        } else {
            this.emit('GameProgress.EndTime');
        }
    }

    
}