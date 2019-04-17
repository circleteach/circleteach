import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  userEntry = new FormControl();
  users: string[] = ["Connor", "Shri", "Jay", "Parker", "Melanie", "Jeff"];
  filteredUsers: Observable<string[]>;

  constructor() { }

  ngOnInit() {
    this.filteredUsers = this.userEntry.valueChanges.pipe(
      startWith(''),
      map(value => this.myFilter(value))
    );
  }

  private myFilter(value: string): string[]{
    const filterValue = value.toLowerCase();
    return this.users.filter(user => user.toLowerCase().includes(filterValue));
  }
  // TODO
  onType() {

  }

}
