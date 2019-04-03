import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycircleComponent } from './mycircle.component';
import {MatCardModule, MatIconModule, MatListModule, MatSidenavModule, MatSlideToggleModule, MatToolbarModule} from '@angular/material';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../../environments/environment';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {RouterTestingModule} from '@angular/router/testing';
import {AppModule} from '../app.module';

describe('MycircleComponent', () => {
  let component: MycircleComponent;
  let fixture: ComponentFixture<MycircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AppModule,
      ],
      // declarations: [ MycircleComponent ]
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
