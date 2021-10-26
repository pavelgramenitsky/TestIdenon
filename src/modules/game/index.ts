import GameStage from "./GameStage";

export default class Game {
    constructor() {
        window.methods.gameStage = new GameStage();
        window.app.stage.addChild(window.methods.gameStage);
    }
}