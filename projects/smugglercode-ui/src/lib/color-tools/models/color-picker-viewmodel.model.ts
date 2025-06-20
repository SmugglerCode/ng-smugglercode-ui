import { ColorGroup } from "./color-group.model";
import { ColorInfo } from "./color-info.model";

export class ColorPickerViewModel {

  // public properties
  public currentColor: ColorInfo = new ColorInfo();
  public colorGroupName: string = '';
  public defaultColors: string[] = ['FF0000', 'FFFF00', '00FFFF', '0000FF', 'FF00FF', 'FF0000'];
  public colorGroups: ColorGroup[] = [];
  public selectedColorGroup: ColorGroup | null = null;
  public showAvailableMulticolors: boolean = false;

  constructor() {
    let cg = this.addColorGroup('default');
    this.selectedColorGroup = cg;
  }

  public addColorGroup(name: string): ColorGroup {
    let existingColorGroup: ColorGroup | null = this.getColorGroup(name);
    if (existingColorGroup === null) {
      let colorGroup = new ColorGroup(name);
      this.colorGroups = [...this.colorGroups, colorGroup];
      return colorGroup;
    }
    return existingColorGroup;
  }

  public addColor(color: ColorInfo): void {
    this.selectedColorGroup?.addColor(color);
  }

  public getColorGroup(name: string): ColorGroup | null {
    let filteredColorGroups = this.colorGroups.filter(cg => cg.name === name);

    if (filteredColorGroups.length > 1) {
      throw 'More then one color group has been found with the same name';
    }

    return filteredColorGroups.length === 1 ? filteredColorGroups[0] : null;
  }
}