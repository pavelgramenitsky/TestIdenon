import config from "../../../config";
import gsap from "gsap";

export default class EndPanel extends PIXI.Container {
    private _bg = new PIXI.Graphics();
    private _txt: PIXI.Text;
    constructor() {
        super();

        this.visible = false;
        
        this._bg.beginFill(0, 0.7);
        this._bg.drawRect(0, 0, config.WIDTH, config.HEIGHT);
        this.addChild(this._bg);

        this._txt = new PIXI.Text('', {
            fill: 0xffffff,
            fontSize: 100,
            fontWeight: 'bold'
        });
        this.addChild(this._txt);
    }

    show(isWin: boolean) {
        this.visible = true;
        this._txt.text = isWin ? 'YOU WIN' : 'YOU LOOSE';
        this._txt.x = this._bg.x + this._bg.width / 2 - this._txt.width / 2;
        this._txt.y = this._bg.y + this._bg.height / 2 - this._txt.height / 2 - 100;

        this._bg.alpha = 0;
        this._txt.alpha = 0;
        gsap.to(this._bg, 1, { alpha: 1 });
        gsap.to(this._txt, 0.5, {alpha: 1, y: this._bg.y + this._bg.height / 2 - this._txt.height / 2})
    }
}