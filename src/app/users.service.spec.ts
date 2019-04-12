import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AppComponent} from './app.component';

describe('UsersService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
    ],
    providers: [AngularFirestore],
  }));

  it('should be created', () => {
    const service: UsersService = TestBed.get(UsersService);
    expect(service).toBeTruthy();
  });

  it ('The specified account should have the specified link as its profile image', () => {
    const fixture: UsersService = TestBed.get(UsersService);
    fixture.getProfileImage('8C4CDYnHEDYVe2aHemmf8iRvTgf1').then(result => {
      expect(result).toEqual('gs://circle-teach.appspot.com/profile-pictures/8C4CDYnHEDYVe2aHemmf8iRvTgf1.jpg');
    }).catch();
  });

  it(`the specified account should have the display name 'Parker Testing'`, () => {
    const fixture = TestBed.get(UsersService);
    fixture.getDisplayName('8C4CDYnHEDYVe2aHemmf8iRvTgf1').then(result => {
      expect(result).toEqual('Parker Testing');
    }).catch();
  });

});
