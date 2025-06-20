import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PropertyLogicService {
  constructor() {}

  public getPropertyValue(obj: any, propertyName: string) {
    var arr = propertyName.split('.');
    if (arr && arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        obj = obj[arr[i]];
      }
    }
    return obj;
  }
}
