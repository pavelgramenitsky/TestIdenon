declare global {
  interface Window {
    app: PIXI.Application;
    ticker: PIXI.Ticker;
    resources: any;
    methods: any; //TODO: Описать интерфейс
    state: any; //TODO: Описать интерфейс
  }
}

export interface Game {
  app: PIXI.Application;
}
