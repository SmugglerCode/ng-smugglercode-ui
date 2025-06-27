import { Component } from '@angular/core';
import { ColorInfo } from '../../projects/smugglercode-ui/src/lib/color-tools/models/color-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smugglercode-ui-sandbox';

  showCustomerDetails: boolean = true;

  color = ['green', 'red', 'yellow'];

  person: Person = new Person();
  colors: ColorInfo[] = [];

  iconPressedEventHandler(value: string |number) : void { 
    alert(value);
  }

  addColorEventHandler(color: ColorInfo) {
    this.colors = [...this.colors, color];
  }
}

export class Person {

  name: string = 'Tommy';

  Address: Address = new Address();

}

export class Address {
  street: string | undefined;
}