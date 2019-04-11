import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalinfoComponent } from './personalinfo.component';
import {MatButtonModule, MatIconModule} from '@angular/material';

describe('PersonalinfoComponent', () => {
  let component: PersonalinfoComponent;
  let fixture: ComponentFixture<PersonalinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatIconModule,
      ],
      declarations: [ PersonalinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
