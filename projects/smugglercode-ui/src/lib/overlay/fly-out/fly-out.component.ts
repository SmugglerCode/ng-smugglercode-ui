import {  ChangeDetectorRef, ChangeDetectionStrategy, Component, ElementRef, HostListener, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgIf } from '@angular/common'

@Component({
  selector: 'sc-fly-out',
  imports: [NgIf],
  templateUrl: './fly-out.component.html',
  styleUrl: './fly-out.component.scss',
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

