import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smugglercode-ui-sandbox';

  person: Person = new Person();

  iconPressedEventHandler(value: string |number) : void {
    alert(value);
  }

}

export class Person {

  name: string = 'Tommy';

  Address: Address = new Address();

}

export class Address {
  street: string | undefined;
}