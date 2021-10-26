import { gsap, PixiPlugin, MotionPathPlugin } from "gsap/all";
import * as PIXI from "pixi.js";
import "pixi-projection";
import "pixi-sound";

import config from "./config";
import { handleResize } from "./assets/js/viewport";

import "./assets/css/main.css";
import "./assets/css/media-queries.css";
import "./assets/css/swipe-up.css";

import { loadResources } from "./loadResources";
import State from "./state";
import Game from "./modules/game";

PIXI.utils.skipHello();
gsap.registerPlugin(PixiPlugin, MotionPathPlugin);
PixiPlugin.registerPIXI(PIXI);

window.state = new State();
window.methods = {};
window.ticker = PIXI.Ticker.shared;

window.app = new PIXI.Application({ width: config.WIDTH, height: config.HEIGHT, antialias: true, backgroundColor: 0x9cd7f7 });
document.getElementById("game-wrapper").appendChild(window.app.view);

const loadApp = async () => {
  
  loadResources(PIXI.Loader.shared, config.assets, (resources): void => {
    window.resources = resources;
    
    //new AppManagers();
    //new Sounds();
    new Game();
    
    // ===== Init features =====
    handleResize(config);
  });
};

loadApp();
