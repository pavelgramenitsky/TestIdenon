export default class Bomb extends PIXI.Container {
    private _radius = 30;
    private _gr = new PIXI.Graphics();

    constructor(radius: number) {
        super();
        this._radius = radius;

        this._gr = new PIXI.Graphics();
        this._gr.beginFill(0x00ff00);
        this._gr.drawCircle(0, 0, this._radius);
        this.addChild(this._gr);
    }

    destroy() {
        this.removeChild(this._gr);
        this._gr.destroy();
    }
}