import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ColorInfo } from '../models/color-info.model';

@Component({
  selector: 'sc-color-palette',
  imports: [NgFor],
  templateUrl: './color-palette.component.html',
  styleUrl: './color-palette.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorPaletteComponent { 

  @Input() colors: ColorInfo[] = [];

}
