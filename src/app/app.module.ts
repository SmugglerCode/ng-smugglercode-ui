import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextBoxComponent } from "../../projects/smugglercode-ui/src/lib/inputs/text-box/text-box.component";
import { InputGroupComponent } from "../../projects/smugglercode-ui/src/lib/forms/InputGroup/InputGroup.component";
import { ColorPickerComponent } from "../../projects/smugglercode-ui/src/lib/color-tools/color-picker/color-picker.component";
import { ColorListComponent } from "../../projects/smugglercode-ui/src/lib/color-tools/color-list/color-list.component";
import { ColorPaletteComponent } from "../../projects/smugglercode-ui/src/lib/color-tools/color-palette/color-palette.component";
import { DropDownComponent} from './../../projects/smugglercode-ui/src/lib/inputs/drop-down/drop-down.component'
import { HeaderComponent } from './../../projects/smugglercode-ui/src/lib/typography/header/header.component'
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextBoxComponent,
    InputGroupComponent,
    HeaderComponent,
    ColorPickerComponent,
    ColorListComponent,
    ColorPaletteComponent,
    DropDownComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
