import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CompeterComponent } from './competer/competer.component';

import { Ng2CompleterModule } from "ng2-completer";
import { DropdownMenuComponent } from './dropdown-menu/dropdown-menu.component';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { CountryListComponent } from './countrylistcomponent/countrylistcomponent.component';
import { TwowayComponent } from './twoway.component';
import { Ng2InputMaskModule } from 'ng2-input-mask';
import { LifecycleComponent } from './lifecycle.component';

@NgModule({
  declarations: [
    AppComponent,
    CompeterComponent,
    DropdownMenuComponent,
    CountryListComponent,
    TwowayComponent,
    LifecycleComponent
  ],
  imports: [
    BrowserModule,
    Ng2CompleterModule,
    FormsModule,
    HttpModule,
    Ng2DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
