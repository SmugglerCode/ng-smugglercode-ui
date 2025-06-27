import {  ChangeDetectorRef, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common'

@Component({
  selector: 'sc-fly-out',
  imports: [NgIf],
  templateUrl: './fly-out.component.html',
  styleUrls: ['./fly-out.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlyOutComponent { 

  /****************** PRIVATE FIELDS *******************************/
  private animationStopId: number = 0;
  private timestampStart: number = 0;
  
  /****************** PUBLIC FIELDS ********************************/
  public showContentAfterAnimation: boolean = false;
  public contentHeight: number = 0;
  public _showContent = false;

  /****************** INPUT FIELDS *********************************/

  @Input() direction: string = 'vertical';
  @Input() disabled: boolean = false;
  @Input() contentFixedWidth: number = -1;
  @Input() animationSpeed: number = 8;
  @Input() dropDownHeight: number = 400;

  @Input()
  set showContent(value: boolean) {
    if (value !== this._showContent) {
      this.toggleFlyOut();
    }
  }

  get showContent(): boolean {
    return this._showContent;
  }

  /****************** OUTPUT FIELDS ********************************/
  @Output() showContentChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  /****************** INPUT FIELDS *********************************/

  @ViewChild('flyOutContent') dropDownContent!: ElementRef;
  @ViewChild('flyOutHeader') flyOutHeader!: ElementRef;

  /****************** CONSTRUCTOR **********************************/
  constructor(private cdr: ChangeDetectorRef) {}

  keydownEventHandler(e: KeyboardEvent) {
    if (e.key == 'ArrowDown' && this.showContent == false) {
      this.toggleFlyOut();
    } else if (e.key == 'ArrowDown' && this.showContent == true) {
      this.focusNextElement(e.target as HTMLElement);
    }
     else if (e.key == 'ArrowUp' && this.showContent == true) {
      this.toggleFlyOut();
    }
  }

  private showDropdDown = (timestamp: number) => {
    if (this.timestampStart == 0) this.timestampStart = timestamp;
    
    var offset = (timestamp - this.timestampStart) / 5;

    this.contentHeight = this.contentHeight + offset;
    this.cdr.markForCheck();

    if (this.contentHeight >= this.dropDownHeight) {
      this.contentHeight = this.dropDownHeight;
    }
    else if(this._showContent){
      this.animationStopId = requestAnimationFrame(this.showDropdDown);
    }
  };

  private hideDropdDown = (timestamp: number) => {
    if (this.timestampStart == 0) this.timestampStart = timestamp;
    
    var offset = (timestamp - this.timestampStart) / 5;

    this.contentHeight = this.contentHeight - offset;
    this.cdr.markForCheck();

    if (this.contentHeight <= 0) {
      this.contentHeight = 0;
    }
    else if(!this._showContent) {
      requestAnimationFrame(this.hideDropdDown);
    }
  };

  toggleFlyOut(): void {

    this.flyOutHeader.nativeElement.focus();

    if(this.disabled) return;

    this.timestampStart = 0;
    cancelAnimationFrame(this.animationStopId);

    //this.contentWidth = this.contentFixedWidth === -1 ? this.flyOutHeader.nativeElement.offsetWidth : this.contentFixedWidth;
    this._showContent = !this._showContent;
    this.showContentChange.emit(this._showContent);

    if (this._showContent) {
      this._showContent = true;
      requestAnimationFrame(this.showDropdDown);
    }
    else {
      requestAnimationFrame(this.hideDropdDown);
    }
  }

  private focusNextElement(current: HTMLElement): void {
    const focusableElements = Array.from(document.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    const currentIndex = focusableElements.indexOf(current);
    const nextElement = focusableElements[currentIndex + 1];

    if (nextElement) {
      nextElement.focus();
    }
  }
  /**********************************************************************************************
   * HOSTLISTENERS
   **********************************************************************************************/
    @HostListener('document:mousedown', ['$event'])
    onGlobalClick(event: MouseEvent): void {

        event.preventDefault();
        event.stopPropagation();

      if (this.dropDownContent == null || this.dropDownContent.nativeElement == null) {
        return;
      }

      if(this.flyOutHeader.nativeElement.contains(event.target)) {
        return;
      }

      if(!this.dropDownContent.nativeElement.contains(event.target)) {
        this.toggleFlyOut();
      }
    }
}

