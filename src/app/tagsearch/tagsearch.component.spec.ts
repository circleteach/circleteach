import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsearchComponent } from './tagsearch.component';

describe('TagsearchComponent', () => {
  let component: TagsearchComponent;
  let fixture: ComponentFixture<TagsearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
