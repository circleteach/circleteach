import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitylogComponent } from './activitylog.component';
import {PostsComponent} from '../posts/posts.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import {AngularFireAuth, AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {MockComponent} from "ng-mocks";

describe('ActivitylogComponent', () => {
  let component: ActivitylogComponent;
  let fixture: ComponentFixture<ActivitylogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        AngularFireAuthModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatButtonToggleModule,
        RouterTestingModule,
      ],
      declarations: [
        ActivitylogComponent,
        MockComponent(PostsComponent),
      ],
      providers: [AngularFirestore, AngularFireAuth]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitylogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
