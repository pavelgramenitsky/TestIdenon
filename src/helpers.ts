import gsap from "gsap";

export const gsapTimer = (time: {fast: number, normal: number}, callback: () => void): void => {
  const timeSetting = window.state.settings.fastPlay ? time.fast : time.normal;

  gsap.to({ x: 0 }, timeSetting, { x: 1 }).eventCallback("onComplete", () => callback());
};

export const testForAABB = (object1: PIXI.Container, object2:PIXI.Container): boolean =>  {
  const bounds1:PIXI.Rectangle = object1.getBounds();
  const bounds2:PIXI.Rectangle = object2.getBounds();

  return (bounds1.x) < bounds2.x + bounds2.width
    && (bounds1.x + bounds1.width) > bounds2.x
    && (bounds1.y) < bounds2.y + bounds2.height
    && bounds1.y + bounds1.height > bounds2.y;
} 

