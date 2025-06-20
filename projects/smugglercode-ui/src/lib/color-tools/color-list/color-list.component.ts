import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { ColorInfo } from '../models/color-info.model';
import { NgFor, NgIf } from '@angular/common';
import { HeaderComponent } from "../../typography/header/header.component";

@Component({
  selector: 'sc-color-list',
  imports: [NgFor, NgIf, HeaderComponent],
  templateUrl: './color-list.component.html',
  styleUrl: './color-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorListComponent {

    @Input() colors: ColorInfo[] = [];
    @Input() showHeader: boolean = false;

  }
