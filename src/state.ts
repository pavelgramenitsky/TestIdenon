import DeviceDetector from "device-detector-js";

const deviceDetector = new DeviceDetector();

export default class State {
  device = deviceDetector.parse(navigator.userAgent);
  translations: object = {};
  settings: object = {};
  APIs: object = {};

  switchSettings(name: string): void {
    localStorage[name] = localStorage[name] === "1" ? "0" : "1";
    this.settings[name] = +localStorage[name];
  }
}
