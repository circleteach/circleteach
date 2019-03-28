import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  getProfilePicture(userID: string): Observable<string | null> {
    const pathRef = this.storage.ref('profile-pictures/' + userID);
    return pathRef.getDownloadURL();
  }

  uploadProfilePicture(userID: string, event) {
    const pathRef = this.storage.ref('profile-pictures/' + userID);
    pathRef.put(event.target.files[0]);
  }
}
