import { Injectable } from "@angular/core";
import { AngularFireStorage } from "@angular/fire/storage";

@Injectable({
  providedIn: "root"
})
export class StorageService {
  constructor(
    private storage: AngularFireStorage,
  ) {}

  getStorageFromLink(link: string): Promise<string | null> {
    const pathRef = this.storage.storage.refFromURL(link);
    return pathRef.getDownloadURL();
  }

  uploadProfilePicture(link: string, event): Promise<string> {
    const pathRef = this.storage.ref(link);
    return pathRef.put(event.target.files[0]).then(uploadTask => {
      return uploadTask.ref.getDownloadURL();
    });
  }
}
