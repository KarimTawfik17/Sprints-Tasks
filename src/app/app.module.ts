import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { NewContactComponent } from './new-contact/new-contact.component';

@NgModule({
  declarations: [AppComponent, ContactComponent, NewContactComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
