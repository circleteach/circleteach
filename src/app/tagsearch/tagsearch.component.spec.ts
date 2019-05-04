import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsearchComponent } from './tagsearch.component';
import {MatAutocompleteModule, MatChipsModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from "@angular/fire";
import {environment} from "../../environments/environment";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireAuth, AngularFireAuthModule} from "@angular/fire/auth";
import {UsersService} from "../users.service";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

describe('TagsearchComponent', () => {
  let component: TagsearchComponent;
  let fixture: ComponentFixture<TagsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        MatIconModule,
        MatChipsModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        NoopAnimationsModule,
        MatAutocompleteModule,
      ],
      declarations: [ TagsearchComponent ],
      providers: [
        AngularFirestore,
        UsersService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
