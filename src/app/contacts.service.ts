import { Injectable } from '@angular/core';
import { IdService } from './id.service';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  idService: IdService;
  contacts: {
    id: number;
    name: string;
    phone: string;
  }[] = [];

  constructor(idService: IdService) {
    this.idService = idService;
    this.contacts = [
      { id: this.idService.getId(), name: 'Mary', phone: '555-5556' },
      { id: this.idService.getId(), name: 'Mike', phone: '555-5557' },
      { id: this.idService.getId(), name: 'Adam', phone: '555-5558' },
    ];
    console.log('this.contacts', this.contacts);
  }
  addContact(name: string, phone: string) {
    this.contacts.push({
      id: this.contacts.length + 1,
      name,
      phone,
    });
  }
  deleteContact(id: number) {
    // console.log('deleteContact', id);
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    // console.log('this.contacts', this.contacts);
  }
  editContact(id: number, name: string, phone: string) {
    // console.log('editContact', id, name, phone);
    const contact = this.contacts.find((contact) => contact.id === id);
    if (contact) {
      contact.name = name;
      contact.phone = phone;
    }
  }
}
