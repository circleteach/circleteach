import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycircleComponent } from './mycircle.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {MatButtonToggleModule} from '@angular/material';

describe('MycircleComponent', () => {
  let component: MycircleComponent;
  let fixture: ComponentFixture<MycircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        MatButtonToggleModule,
      ],
      declarations: [
        MycircleComponent
      ],
      providers: [
        AngularFirestore
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MycircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
