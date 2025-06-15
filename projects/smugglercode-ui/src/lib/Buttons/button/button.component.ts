import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sc-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent { }
