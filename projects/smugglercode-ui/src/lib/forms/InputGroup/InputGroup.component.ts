import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sc-input-group',
  imports: [NgIf],
  templateUrl: './InputGroup.component.html',
  styleUrl: './InputGroup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent { 
  @Input() label: string | null = null;
  @Input() width: string = '100%';
  @Input() margin: string | null= null;

  get CssStyle(): string {
    let css = `width: ${this.width}`;
    
    if(this.margin)
      css = `${css};margin:${this.margin}`;
    
    return css;
  }
}
