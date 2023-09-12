import { Component } from '@angular/core';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  contactsService: ContactsService;
  constructor(contactService: ContactsService) {
    this.contactsService = contactService;
  }
}
