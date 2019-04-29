import { Component, OnInit } from '@angular/core';
import { TagsService } from '../services/tags.service';
import { Tag } from '../models/tags.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tagsearch',
  templateUrl: './tagsearch.component.html',
  styleUrls: ['./tagsearch.component.scss']
})
export class TagsearchComponent implements OnInit {

  tagEntry = new FormControl();
  tags: Tag[];
  selectedTags: Tag[] = [];
  tagNames = [];

  filteredTags: Observable<string[]>;

  constructor(public tagService: TagsService) { }

  ngOnInit() {
    this.loadTags();
  }

  private loadTags() {
    this.tagService.getTags().subscribe(data => {
      this.tags = data.map(e => {
        return{
          id: e.payload.doc.id,
          ...e.payload.doc.data()
        } as Tag;
      });

      this.tags.forEach(tag => {
        this.tagNames.push(tag.name);
      });
    });

    this.filteredTags = this.tagEntry.valueChanges.pipe(
      startWith(''),
      map(value => this.myFilter(value))
    );
  }

  private myFilter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagNames.filter(user => user.toLowerCase().includes(filterValue));
  }

  addTag() {
    const newTag = new Tag();

    if (this.tagNames.includes(this.tagEntry.value)) {
      newTag.name = this.tagEntry.value;
      this.selectedTags.push(newTag);
      console.log("Existing Tag Found, Added to Filter List");
    } else {
      newTag.name = this.tagEntry.value;
      this.tagService.createTag(newTag);
      this.selectedTags.push(newTag);
      console.log("New Tag Created and Pushed to DB!");
    }

    if (this.selectedTags.length > 0) {
      this.tagService.changeTags(this.selectedTags);
    } else {
      let dummyArr: Tag[] = [];
      let dummyTag: Tag = new Tag();
      dummyTag.name = "EMPTY";
      dummyArr.push(dummyTag);
      this.tagService.changeTags(dummyArr);
    }
  }


  remove(tag: Tag): void {
    const index = this.selectedTags.indexOf(tag);

    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    }

    if (this.selectedTags.length > 0) {
      this.tagService.changeTags(this.selectedTags);
    } else {
      console.log("Adding in the empty signal tag.");
      const dummyArr: Tag[] = [];
      const dummyTag: Tag = new Tag();
      dummyTag.name = "EMPTY";
      dummyArr.push(dummyTag);
      this.tagService.changeTags(dummyArr);
    }
  }
}
