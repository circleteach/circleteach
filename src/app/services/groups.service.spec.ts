import {async, TestBed} from '@angular/core/testing';

import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {GroupsService} from "./groups.service";

describe('GroupsService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
      ],
      providers: [AngularFirestore],
    });
  }));

  it('should be created', () => {
    const service: GroupsService = TestBed.get(GroupsService);
    expect(service).toBeTruthy();
  });

  it ('The specified group should have a name SMG', () => {
    const fixture: GroupsService = TestBed.get(GroupsService);
    fixture.getGroupName('kK9jqzsnR1OFScwufon9').then(result => {
      expect(result).toEqual('"SMH"');
    }).catch();
  });
});
