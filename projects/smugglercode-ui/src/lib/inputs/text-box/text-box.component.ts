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
  private _text: string | number = '';
  private _inputElementRef: ElementRef | undefined | null;

  /****************** INPUT FIELDS *********************************/

  @Input() disabled: boolean = false;
  @Input() maxLength: number = 999;
  @Input() icon: string | null = null;
  @Input() showClearIcon: boolean = false;

  @Input()
  get text(): string | number {
    return this._text;
  }
  set text(value: string) {
    this._text = value?.toString() ?? '';
  }

  /****************** OUTPUT FIELDS ********************************/

  @Output() textChange: EventEmitter<any> = new EventEmitter<any>();
  @Output() onEnter: EventEmitter<any> = new EventEmitter<any>();
  @Output() onLostFocus: EventEmitter<any> = new EventEmitter<any>();
  @Output() onIconPressed: EventEmitter<any> = new EventEmitter<any>();

/****************** VIEWCHILD DEFINITIONS ************************/

@ViewChild('inputfield') set inputfield(val: ElementRef) {
  this._inputElementRef = val;
}

  /****************** PUBLIC METHODS ********************************/

  public blurChanged(): void {
    this.onLostFocus.emit(this._text);
  }

  public textChanged(event: any): void {
    if (event && event.target) {
      this._text = event.target.value;
      this.textChange.emit(event.target.value);
    }
  }

  public clear(): void {
    this.text = '';
    this.textChange.emit(this._text);
  }

  public enterPressed(): void {
    this.onEnter.emit(this._text);
  }

  public iconPressedEventHandler() {
    if (this.disabled) return;
    this.onIconPressed.emit(this._text);
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
