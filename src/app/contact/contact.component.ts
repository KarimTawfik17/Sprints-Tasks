import { Component, Input } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent {
  contactsService: ContactsService;
  editMode: boolean = false;
  constructor(contactsService: ContactsService) {
    this.contactsService = contactsService;
  }

  @Input() contact: { id: number; name: string; phone: string } = {
    id: 0,
    name: '',
    phone: '',
  };
  onEdit() {
    if (this.editMode) {
      this.contactsService.editContact(
        this.contact.id,
        this.contact.name,
        this.contact.phone
      );
    }
    this.editMode = !this.editMode;
  }
}
