import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Users} from '../models/users.model';
import {UsersService} from '../users.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.scss']
})
export class UserSearchComponent implements OnInit {
  userEntry = new FormControl();
  users: Users[];
  userNames = new Array();

  filteredUsers: Observable<string[]>;

  constructor(
    private usersService: UsersService,
    private router: Router
  ) { }

  ngOnInit() {
    this.usersService.getAllUsers().subscribe(data => {
      this.users = data.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Users;
      });
      console.log(this.users);

      this.users.forEach(user => {
        this.userNames.push(user.name);
      });
      console.log(this.userNames);
    });

    this.filteredUsers = this.userEntry.valueChanges.pipe(
      startWith(''),
      map(value => this.myFilter(value))
    );
  }

  private myFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.userNames.filter(user => user.toLowerCase().includes(filterValue));
  }

  public goUser() {
    const goName = this.userEntry.value;
    let id = '';
    let keepGoing = true;
    this.users.forEach(user => {
      if (keepGoing) {
        if (goName === user.name) {
          id = 'profile/' + user.id;
          keepGoing = false;
        }
      }
    });
    if (id !== '') {
      this.router.navigate([id]);
    }
  }

}
