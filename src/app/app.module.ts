import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextBoxComponent } from "../../projects/smugglercode-ui/src/lib/inputs/text-box/text-box.component";
import { InputGroupComponent } from "../../projects/smugglercode-ui/src/lib/forms/InputGroup/InputGroup.component";
import { HeaderComponent } from '../../projects/smugglercode-ui/src/public-api';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TextBoxComponent,
    InputGroupComponent,
    HeaderComponent
],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
