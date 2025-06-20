import { ColorTag } from "./color-tag.model";

/* Contains the information about a color int argb format as well as in hex format.
 * Furthermore it has some functionality to convert a color format from one to another: rgb to hex, ... and for fotmatting them.
 */
export class ColorInfo {

  public tags: ColorTag[] = [];
  public a: number = 0;
  public r: number = 0;
  public g: number = 0;
  public b: number = 0;
  public rAsHex: string = '00';
  public gAsHex: string = '00';
  public bAsHex: string = '00';
  public x: number = 0;
  public y: number = 0;
  public baseColor: string = 'FFFFFF';

  public get colorAsHex(): string {
    return '#' + this.rAsHex + this.gAsHex + this.bAsHex;
  }

  public set colorAsHex(value: string) {
    if (value.length === 7) {
      value = value.slice(1);
    }

    const rAsHex = value.slice(0, 2);
    const gAsHex = value.slice(2, 4);
    const bAsHex = value.slice(4, 6);

    this.r = parseInt(rAsHex, 16);
    this.g = parseInt(gAsHex, 16);
    this.b = parseInt(bAsHex, 16);
}

  public setRgbValues(r: number, g: number, b: number): void {
    this.r = r;
    this.g = g;
    this.b = b;
    this.rAsHex = this.formatHexWith2Digits(r);
    this.gAsHex = this.formatHexWith2Digits(g);
    this.bAsHex = this.formatHexWith2Digits(b);
  }

  private formatHexWith2Digits(value: number) {
    var hex = value.toString(16);
    return value < 16 ? '0' + hex : hex;
  }
}