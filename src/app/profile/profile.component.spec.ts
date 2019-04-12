import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {ActivitylogComponent} from '../activitylog/activitylog.component';
import {LayoutComponent} from '../layout/layout.component';
import {MycircleComponent} from '../mycircle/mycircle.component';
import {PostsComponent} from '../posts/posts.component';
import {MatCardModule, MatSlideToggleModule} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {MockComponent} from 'ng-mocks';
import {BasicinfoComponent} from '../basicinfo/basicinfo.component';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatSlideToggleModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
      ],
      declarations: [
        ProfileComponent,
        MockComponent(LayoutComponent),
        MockComponent(PostsComponent),
        MockComponent(BasicinfoComponent),
        MockComponent(MycircleComponent),
        MockComponent(ActivitylogComponent),
      ],
      providers: [
        AngularFirestore
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
