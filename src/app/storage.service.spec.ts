import { TestBed } from "@angular/core/testing";

import { StorageService } from "./storage.service";
import { AngularFireModule } from "@angular/fire";
import { environment } from "../environments/environment";
import {
  AngularFireStorage,
  AngularFireStorageModule
} from "@angular/fire/storage";

describe("StorageService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireStorageModule
      ],
      providers: [AngularFireStorage]
    })
  );

  it("should be created", () => {
    const service: StorageService = TestBed.get(StorageService);
    expect(service).toBeTruthy();
  });

  it("should return proper download link", () => {
    const service: StorageService = TestBed.get(StorageService);
    service
      .getStorageFromLink(
        "gs://circle-teach.appspot.com/profile-pictures/8C4CDYnHEDYVe2aHemmf8iRvTgf1.jpg"
      )
      .then(result => {
        // tslint:disable-next-line:max-line-length
        expect(result).toEqual(
          "https://firebasestorage.googleapis.com/v0/b/circle-teach.appspot.com/o/profile-pictures%2F8C4CDYnHEDYVe2aHemmf8iRvTgf1.jpg?alt=media&token=37975ec5-b6b3-4696-886e-b95be034f2a6"
        );
      });
  });
});
