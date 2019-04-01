import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireStorage, AngularFireStorageModule} from '@angular/fire/storage';

describe('StorageService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      AngularFireModule.initializeApp(environment.firebaseConfig),
      AngularFireStorageModule,
    ],
    providers: [AngularFireStorage],
  }));

  it('should be created', () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });
});
