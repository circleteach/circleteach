import { TestBed } from '@angular/core/testing';

import { ProfileDetailsService } from './profile-details.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';

describe('ProfileDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFirestoreModule,
    ],
    providers: [AngularFirestore],
  }));

  it('should be created', () => {
    const service: ProfileDetailsService = TestBed.get(ProfileDetailsService);
    expect(service).toBeTruthy();
  });
});
