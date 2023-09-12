import { Component } from '@angular/core';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchField: string = '';
  contactsService: ContactsService;
  constructor(contactsSevice: ContactsService) {
    this.contactsService = contactsSevice;
  }
  search(e: Event) {
    e.preventDefault();

    this.contactsService.search(this.searchField);
  }
}
