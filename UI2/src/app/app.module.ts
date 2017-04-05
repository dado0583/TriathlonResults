import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { AthleteComponent } from './athlete/athlete.component';
import {Ng2CompleterModule} from 'ng2-completer'
import {DropdownModule, Dropdown, DropdownNotClosableZone, DropdownOpen} from "ngx-dropdown";

import { TextMaskModule } from 'angular2-text-mask';
import { TextMaskComponent } from './text-mask/text-mask.component';

@NgModule({
  declarations: [
    AppComponent,
    AthleteComponent,
    TextMaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Ng2CompleterModule,
    HttpModule,
    DropdownModule,
    TextMaskModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
