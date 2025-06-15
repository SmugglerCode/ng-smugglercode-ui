import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'smugglercode-ui-sandbox';

  iconPressedEventHandler(value: string |number) : void {
    alert(value);
  }

}
