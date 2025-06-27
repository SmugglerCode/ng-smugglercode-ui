import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet} from '@angular/common'
import { SelectableItem } from '../../common/models/selectable-item.model';
import { TextBoxComponent, FlyOutComponent, PropertyLogicService } from '../../../public-api';

@Component({
  selector: 'sc-drop-down',
  imports: [FlyOutComponent, TextBoxComponent, NgTemplateOutlet, NgIf, NgFor],
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropDownComponent<T> {
/**********************************************************************************************
   * PRIVATE VARIABLES
   **********************************************************************************************/
  private _fullList: SelectableItem<T>[] = [];
  private _isInitMode: boolean = true;
  private _item: T | undefined | null;
  private _items: T[] = [];

  /**********************************************************************************************
   * PUBLIC VARIABLES
   **********************************************************************************************/
  public showContent: boolean = false;
  public selectableItems: SelectableItem<T>[] = [];
  public selectableItem: SelectableItem<T> | null | undefined;

  /**********************************************************************************************
   * INPUT VARIABLES
   **********************************************************************************************/
  @Input() autoSearch: boolean = true;
  @Input() dataKey: string | undefined | null = undefined;
  @Input() displayProperty: string | undefined | null = undefined;
  @Input() placeholder: string | undefined | null = 'Select a value ...';
  @Input() showSearchField: boolean = false;
  @Input() disabled: boolean = false;
  @Input() dropDownHeight: number = 400;

  @Input() set items(val: T[]) {
    this._items = val ?? []; 
    if (this._isInitMode === false) {
      this._fullList = this.asSelectables(this._items);
      this.selectableItems = [...this._fullList];
    }
  }

  @Input() set item(val: T | undefined | null) {
    this._item = val;
    if (this.dataKey && this.propertyLogic && val) {
      const valKeyValue = this.propertyLogic.getPropertyValue(val, this.dataKey!);
      const el = this.selectableItems.find((x) => {
        const refKeyValue = this.propertyLogic.getPropertyValue(x.itemRef, this.dataKey!);
        if (refKeyValue === valKeyValue) {
          x.isSelected = true;
          this.selectableItem = x;
        }
      });
      if (el) el.isSelected = true;
    }
  }

  get item(): T | undefined | null {
    return this._item;
  }

  get items(): T[] {
    return this._items;
  }

  /**********************************************************************************************
   * OUTPUT VARIABLES
   **********************************************************************************************/
  @Output() itemChange: EventEmitter<T> = new EventEmitter<T>();
  @Output() searchTextChange: EventEmitter<string> = new EventEmitter<string>();

  /**********************************************************************************************
   * CHILD REFS
   **********************************************************************************************/
  @ContentChild('contentTemplate') contentTemplate: TemplateRef<any> | undefined;
  @ContentChild('headerTemplate') headerTemplate: TemplateRef<any> | undefined;

  /**********************************************************************************************
   * CONSTRUCTOR AND HOOKS
   **********************************************************************************************/
  constructor(private propertyLogic: PropertyLogicService) {}

  public ngOnInit(): void {
    this._fullList = this.asSelectables(this._items);
    this.selectableItems = [...this._fullList];
    this._isInitMode = false;
  }

  /**********************************************************************************************
   * PUBLIC METHODS
   **********************************************************************************************/
  public selectionChanged(item: SelectableItem<T>) {

    this.selectableItems.forEach(i => { i.isSelected = false; });
    item.isSelected = true;

    this.selectableItem = item;
    this.item = item.itemRef;
    this.itemChange.emit(item.itemRef);
    this.showContent = false;
  }

  public searchText(text: string): void {
    if (this.autoSearch && text === '') this.selectableItems = [...this._fullList!];

    if (this.autoSearch && !this.displayProperty) {
      this.selectableItems = this._fullList!.filter((item) => {
        return typeof item.itemRef === 'string' ? item.itemRef.toLowerCase().includes(text.toLowerCase()) : true;
      });
    }

    if (this.autoSearch && this.displayProperty) {
      this.selectableItems = this._fullList!.filter((item) => {
        const value = this.propertyLogic.getPropertyValue(item.itemRef, this.displayProperty!);
        return value.toLowerCase().includes(text.toLowerCase());
      });
    }
    this.searchTextChange.emit(text);
  }

  keydownEventHandler(e: KeyboardEvent, i: number) {
    console.log(e.key)
    if (e.key == 'ArrowDown' && i < this.items.length - 1) {
      e.preventDefault();
      this.focusNextElement(e.target as HTMLElement);
    } else if (e.key == 'ArrowUp' && i > 0){
      e.preventDefault();
      this.focusPreviousElement(e.target as HTMLElement);
    } else if (e.key == 'Enter' || e.key == ' ') {
      e.preventDefault();
      this.selectionChanged(this.selectableItems[i]);
    } else if (e.key == 'Tab' && i == this.items.length - 1) {
        e.preventDefault();
        this.showContent = false;
      }
  }

  /**********************************************************************************************
   * PRIVATE METHODS
   **********************************************************************************************/

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

  private focusPreviousElement(current: HTMLElement): void {
    const focusableElements = Array.from(document.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled') && !el.getAttribute('aria-hidden'));

    const currentIndex = focusableElements.indexOf(current);
    const nextElement = focusableElements[currentIndex - 1];

    if (nextElement) {
      nextElement.focus();
    }
  }

  private asSelectables(items: T[]): SelectableItem<T>[] {
    const selectables: SelectableItem<T>[] = [];
    items.forEach((item: T) => {
      const label = this.getLabelValue(item);
      selectables.push({ itemRef: item, isSelected: false, label: label });
    });
    return selectables;
  }

  private getLabelValue(item: T): string | null {
    if (typeof item === 'string') return item;
    if (typeof item === 'number') return item.toString();
    if (this.displayProperty) return this.propertyLogic.getPropertyValue(item, this.displayProperty);
    return null;
  }
}
