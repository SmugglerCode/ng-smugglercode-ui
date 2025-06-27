import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { NgIf} from '@angular/common'

@Component({
  selector: 'sc-check-box',
  imports: [NgIf],
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckBoxComponent {

  @ViewChild('container') container!: ElementRef;

  @Input() checked: boolean = false;
  @Input() label: string = '';

  @Output() checkedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  public toggle() {
    this.checked = !this.checked;
    this.checkedChange.emit(this.checked);
    this.container.nativeElement.focus();
  }

  keyboardEventHandler(e: KeyboardEvent) {
    if (e.key == 'Enter' || e.key == ' ')
    {
      e.stopPropagation();
      e.preventDefault();
      this.toggle();
    }
  }

 }
