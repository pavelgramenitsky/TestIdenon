export default class Ship extends PIXI.Container {
    constructor() {
        super();
        const ship = PIXI.Sprite.from('spaceship.png');
        this.addChild(ship);
    }
}