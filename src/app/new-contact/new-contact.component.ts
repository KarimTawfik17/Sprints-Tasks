import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-new-contact',
  templateUrl: './new-contact.component.html',
  styleUrls: ['./new-contact.component.scss'],
})
export class NewContactComponent {
  name: string = '';
  phone: string = '';
  contactsService: ContactsService;
  constructor(contactsService: ContactsService) {
    this.contactsService = contactsService;
  }
  onSubmit(e: any) {
    e.preventDefault();
    console.log('submit', this.name, this.phone);
    this.contactsService.addContact(this.name, this.phone);
    this.name = '';
    this.phone = '';
  }
}
