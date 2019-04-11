import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsearchComponent } from './tagsearch.component';
import {MatChipsModule, MatIconModule, MatInputModule} from '@angular/material';
import {FormsModule} from '@angular/forms';

describe('TagsearchComponent', () => {
  let component: TagsearchComponent;
  let fixture: ComponentFixture<TagsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatChipsModule,
        MatInputModule,
        FormsModule,
      ],
      declarations: [ TagsearchComponent ]
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
