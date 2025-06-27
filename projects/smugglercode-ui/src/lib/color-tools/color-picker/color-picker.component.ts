import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ColorPickerViewModel } from '../models/color-picker-viewmodel.model';
import { ColorInfo } from '../models/color-info.model';
import { TextBoxComponent } from "./../../inputs/text-box/text-box.component";

@Component({
  selector: 'sc-color-picker',
  imports: [TextBoxComponent],
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPickerComponent {

  private canvas: HTMLCanvasElement = null!;
  private ctx: CanvasRenderingContext2D | null = null;
  private mainCanvas: HTMLCanvasElement = null!;
  private mainCtx: CanvasRenderingContext2D | null = null;

  public viewModel: ColorPickerViewModel = new ColorPickerViewModel();
  public colorsAsHex: string[] = ['FF', 'FF', 'FF'];
  public colorsAsNumbers: number[] = [255, 255, 255];
  public x: number = 0;
  public y: number = 0;
  public colorArrowY: number = -5;

  @ViewChild('colorCanvas') colorCanvas!: ElementRef;
  @ViewChild('mainColorCanvas') mainColorCanvas!: ElementRef;
  
  @Output() color: EventEmitter<string> = new EventEmitter<string>();
  @Output() colorInfo: EventEmitter<ColorInfo> = new EventEmitter<ColorInfo>();
  @Output() onAddColor: EventEmitter<ColorInfo> = new EventEmitter<ColorInfo>();

  constructor(){
  }

  ngAfterViewInit(): void {
    this.canvas = this.colorCanvas.nativeElement as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d');

    this.mainCanvas = this.mainColorCanvas.nativeElement as HTMLCanvasElement;
    this.mainCtx = this.mainCanvas.getContext('2d');

    this.createGradient(this.viewModel.defaultColors);
    this.drawColorSquare("#FF0000");
    this.viewModel.currentColor.baseColor = "#FF0000"
  }

  private createGradient(colors: string[]): void {
    if (colors.length <= 1) {
      return;
    }

    if (this.ctx) {
      const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
      let step = 1 / (colors.length - 1);
      let colorIndex = 0;
      colors.forEach(c => {
        gradient.addColorStop(colorIndex, '#' + c);
        colorIndex += step;
        colorIndex = colorIndex > 1 ? 1 : colorIndex;
      });
      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  public getColorAtPosition(x: number, y: number): string {
    if (this.mainCtx) {
      const pixel = this.mainCtx.getImageData(x, y, 1, 1, ).data;
      const rgb = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;
      this.colorsAsHex = [pixel[0].toString(16), pixel[1].toString(16), pixel[2].toString(16)]
      return rgb;
    }
    return '';
  }

  public getHexColorAtPosition(x: number, y: number): number[] {
    if (this.mainCtx) {
      const pixel = this.mainCtx.getImageData(x, y, 1, 1).data;
      return [pixel[0], pixel[1], pixel[2]];
    }
    return [];
  }

  private formatHexWith2Digits(value: number): string {
    var hex = value.toString(16);
    return value < 16 ? '0' + hex : hex;
  }

  public selectFinalColor(event: MouseEvent): void {
    if (this.mainCtx) {

      const rect = this.mainCanvas.getBoundingClientRect();
      this.x = event.clientX - rect.left;
      this.y = event.clientY - rect.top;
      const pixel = this.mainCtx.getImageData(this.x, this.y, 1, 1).data;
      this.viewModel.currentColor.setRgbValues(pixel[0], pixel[1], pixel[2]);
      this.viewModel.currentColor.x = this.x;
      this.viewModel.currentColor.y = this.y;
      this.color.emit(this.viewModel.currentColor.colorAsHex);
      this.colorInfo.emit(this.viewModel.currentColor);
    }
  }

  public selectColorFromSwatch(color: ColorInfo): void {
    Object.assign(this.viewModel.currentColor, color)
    this.x = this.viewModel.currentColor.x;
    this.y = this.viewModel.currentColor.y;
    this.drawColorSquare(this.viewModel.currentColor.baseColor);
  }

  /// Handles the selection of the base color, the base color is used for generating the final color chart from which
  // we will select the end color to be used by the user/program.
  public selectColor(event: MouseEvent): void {
    if (this.ctx) {
      const rect = this.canvas.getBoundingClientRect();
      const x = event.offsetX;
      const y = event.offsetY;
      const pixel = this.ctx.getImageData(x, y, 1, 1).data;
      this.colorsAsNumbers = [pixel[0], pixel[1], pixel[2]];
      this.colorsAsHex = [pixel[0].toString(16), pixel[1].toString(16), pixel[2].toString(16)]
      const rgbHexValue = this.getRgbValue(this.colorsAsHex);

      this.colorArrowY = y - 5;

      this.drawColorSquare(rgbHexValue);
      const rgbValues = this.getHexColorAtPosition(this.x, this.y);
      this.viewModel.currentColor.setRgbValues(rgbValues[0], rgbValues[1], rgbValues[2]);
      this.viewModel.currentColor.baseColor = rgbHexValue;
      this.color.emit(this.viewModel.currentColor.colorAsHex);
    }
  }

  public addColor(color: ColorInfo) {
    let c = new ColorInfo();
    Object.assign(c, color);
    this.viewModel.addColor(c);
    this.onAddColor.emit(c);
  }

  public getRgbValue(values: string[]): string {
    return "#" + this.get2decimals(values[0]) + this.get2decimals(values[1]) + this.get2decimals(values[2]);
  }

  private get2decimals(val: string) {
    return val.length === 1 ? '0' + val.toUpperCase() : val.toUpperCase();
  }

  private drawColorSquare(selectedColor: string): void {
    if (!this.mainCtx) {
      return;
    }

    const width = this.mainCanvas.width;
    const height = this.mainCanvas.height;

    // Fill background with the selected color
    let colorGradient = this.mainCtx.createLinearGradient(0, 0, width, 0);
    colorGradient.addColorStop(0, '#FFF');
    colorGradient.addColorStop(1, selectedColor);
    this.mainCtx.fillStyle = colorGradient;
    this.mainCtx.fillRect(0, 0, width, height);

    // Vertical gradient white to black
    const blackGradient = this.mainCtx.createLinearGradient(0, 0, 0, height);
    blackGradient.addColorStop(0, 'rgba(0,0,0,0)');
    blackGradient.addColorStop(1, '#000');

    // Apply gradients
    this.mainCtx.fillStyle = blackGradient;
    this.mainCtx.fillRect(0, 0, width, height);
  }

 }
