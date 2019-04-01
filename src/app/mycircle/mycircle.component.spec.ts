import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MycircleComponent } from './mycircle.component';

describe('MycircleComponent', () => {
  let component: MycircleComponent;
  let fixture: ComponentFixture<MycircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycircleComponent ]
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
