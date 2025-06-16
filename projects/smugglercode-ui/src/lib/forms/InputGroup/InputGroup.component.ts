import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'sc-input-group',
  imports: [],
  templateUrl: './InputGroup.component.html',
  styleUrl: './InputGroup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent { 
  @Input() label: string | null = null;
  @Input() width: string = '100%';

  get CssStyle(): string {
    return `width: ${this.width}`;
  }
}
