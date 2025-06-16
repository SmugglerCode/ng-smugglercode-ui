import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'sc-text-box',
  imports: [CommonModule],
  templateUrl: './text-box.component.html',
  styleUrl: './text-box.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextBoxComponent {
  private _inputElementRef: ElementRef | undefined | null;

  /****************** INPUT FIELDS *********************************/

  @Input() disabled: boolean = false;
  @Input() maxLength: number = 999;
  @Input() icon: string | null = null;
  @Input() showClearIcon: boolean = false;
  @Input() text: string | number = '';
  @Input() width: string = '100%';

  /****************** OUTPUT FIELDS ********************************/

  @Output() textChange: EventEmitter<string | number> = new EventEmitter<string | number>();
  @Output() onEnter: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLostFocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconPressed: EventEmitter<any> = new EventEmitter<any>();

/****************** VIEWCHILD DEFINITIONS ************************/

@ViewChild('inputfield') set inputfield(val: ElementRef) {
  this._inputElementRef = val;
}

  /****************** PUBLIC METHODS ********************************/

  get CssStyle(): string {
    return `width: ${this.width}`;
  }

  public blurChanged(): void {
    this.onLostFocus.emit(this.text);
  }

  public textChanged(event: any): void {
    if (event && event.target) {
      this.text = event.target.value;
      this.textChange.emit(event.target.value);
    }
  }

  public clear(): void {
    this.text = '';
    this.textChange.emit('');
  }

  public enterPressed(): void {
    this.onEnter.emit(this.text);
  }

  public iconPressedEventHandler() {
    if (this.disabled) return;
    this.onIconPressed.emit(this.text);
  }

  public clearPressedEventHandler() {
    this.clear();
  }

  setFocus(): void {
    if (this._inputElementRef) {
      this._inputElementRef.nativeElement.focus();
    }
  }
 }
