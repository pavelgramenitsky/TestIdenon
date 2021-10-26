import { speed } from "jquery";
import config from "../../../config";
import gsap, { Linear } from "gsap";

export default class Background extends PIXI.Container {
    private _queue: PIXI.Sprite[] = [];
    private _speed = 10;
    constructor() {
        super();

        for (let i = 0 ; i < 3; i++) {
            const back = PIXI.Sprite.from('background.png');
            this.addChild(back);

            back.y = back.height * (-i);
            this._queue.push(back);
        }

        const ticker = new PIXI.Ticker();
        ticker.add(this._update.bind(this));
        ticker.start();

    }

    private _update() {
        for (let i = 0; i < this._queue.length; i++) {
            this._queue[i].y += this._speed;
        }

        if (this._queue[0].y > config.HEIGHT) {
            const back = this._queue[0];
            this._queue.shift();
            back.y = this._queue[this._queue.length - 1].y - back.height;
            this._queue.push(back);
        }
    }

}