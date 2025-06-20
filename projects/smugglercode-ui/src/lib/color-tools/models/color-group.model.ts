import { ColorInfo } from "./color-info.model";

export class ColorGroup {
  public name: string = null!;
  public colors: ColorInfo[] = [];
  public allowDoubleColors = false;

  constructor(name: string) {
    this.name = name;
  }

  public addColor(color: ColorInfo): void {
    // return if we do not allow any double colors and the color is already added to the list
    if (this.allowDoubleColors === false) {
      const colorsAsString = this.colors.map(c => c.colorAsHex);
      if (colorsAsString.includes(color.colorAsHex)) {
        return;
      }
    }
    const c = new ColorInfo();
    Object.assign(c, color);
    this.colors.push(c);
  }
}