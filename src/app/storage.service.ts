import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage) { }

  getStorageFromLink(link: string): Observable<string | null> {
    const pathRef = this.storage.ref(link);
    return pathRef.getDownloadURL();
  }

  uploadProfilePicture(link: string, event) {
    const pathRef = this.storage.ref(link);
    pathRef.put(event.target.files[0]);
  }
}
