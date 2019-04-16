import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AngularFireStorage } from "@angular/fire/storage";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
    private auth: AuthenticationService
  ) {}

  getStorageFromLink(link: string): Promise<string | null> {
    const pathRef = this.storage.storage.refFromURL(link);
    return pathRef.getDownloadURL();
  }

  uploadProfilePicture(link: string, event) {
    const pathRef = this.storage.ref(link);
    pathRef.put(event.target.files[0]);
  }
}
