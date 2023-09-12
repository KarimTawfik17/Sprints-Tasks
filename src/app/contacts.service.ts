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
  shownContacts: {
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
    this.shownContacts = this.contacts;
    // console.log('this.contacts', this.contacts);
  }
  addContact(name: string, phone: string) {
    this.contacts.push({
      id: this.contacts.length + 1,
      name,
      phone,
    });
    this.shownContacts = this.contacts;
  }
  deleteContact(id: number) {
    // console.log('deleteContact', id);
    this.contacts = this.contacts.filter((contact) => contact.id !== id);
    // console.log('this.contacts', this.contacts);
    this.shownContacts = this.contacts;
  }
  editContact(id: number, name: string, phone: string) {
    // console.log('editContact', id, name, phone);
    const contact = this.contacts.find((contact) => contact.id === id);
    if (contact) {
      contact.name = name;
      contact.phone = phone;
    }
    this.shownContacts = this.contacts;
  }
  search(searchField: string) {
    // console.log('search', searchField);
    if (searchField.trim() === '') {
      this.shownContacts = this.contacts;
      return;
    }
    const searchFieldLowercase = searchField.toLowerCase();
    this.shownContacts = this.contacts.filter((contact) => {
      const nameLowercase = contact.name.toLowerCase();
      return nameLowercase.includes(searchFieldLowercase);
    });
  }
}
