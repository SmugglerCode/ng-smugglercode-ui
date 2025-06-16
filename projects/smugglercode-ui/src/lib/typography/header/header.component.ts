import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, Input } from '@angular/core';

@Component({
  selector: 'sc-header',
  imports: [NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { 

  @Input() label: string | null = null;
  @Input() size: number = 1; 
  @Input() showDivider: boolean = false;

  get CssSize(): string {
     switch(this.size) {
      case 1: return 'sc-header-001';
      case 2: return 'sc-header-002';
      default: return 'sc-header-001'
     }
  }
}
