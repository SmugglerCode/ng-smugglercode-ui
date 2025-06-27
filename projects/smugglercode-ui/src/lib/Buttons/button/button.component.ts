import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonType } from './enums/button-type.enum';

@Component({
  selector: 'sc-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent { 

public buttonTypes = ButtonType;

  @Input() type: ButtonType = ButtonType.Primary;
  @Input() label: string | null = null;
  @Input() disabled: boolean = false;

  @Output() click: EventEmitter<void> = new EventEmitter<void>();

  public clicked(event: Event): void {
    event.stopPropagation();
    if (!this.disabled) {
      this.click.emit();
    }
  }

}
