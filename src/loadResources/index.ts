import gsap from "gsap";
import { gsapTimer } from "../helpers";

export const loadResources = (
  loader: PIXI.Loader,
  assets: { name: string; path: string }[],
  onAssetsLoaded: (resources: any) => void
) => {
  assets.forEach(({ name, path }) => {
    loader.add(name, path);
  });

  loader.load();

  loader.onProgress.add(({ progress }) => {
    const progressContainer: HTMLElement = document.getElementById("progressContainer");
    const progressEl = progressContainer.getElementsByClassName("progress") as HTMLCollectionOf<HTMLElement>;

    progressEl[0].style.width = `${progress}%`;
  });
  loader.onComplete.add(({ resources }) => {
    gsapTimer({fast: 0.1, normal: 0.1}, () => {
      const body: HTMLElement = document.getElementsByTagName("body")[0];
      body.style.overflow = "auto";

      const loader = document.getElementsByClassName("loader") as HTMLCollectionOf<HTMLElement>;
      gsap.to(loader[0], 0.4, { alpha: 0 }).eventCallback("onComplete", () => {
        loader[0].remove();
      });

      onAssetsLoaded(resources);
    });
  });
};
