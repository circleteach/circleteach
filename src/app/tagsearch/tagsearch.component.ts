import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tagsearch',
  templateUrl: './tagsearch.component.html',
  styleUrls: ['./tagsearch.component.scss']
})
export class TagsearchComponent implements OnInit {

  currTag= '';
  tags: string[] = [];

  constructor() { }

  ngOnInit() {
  }

  addTag(){
    this.tags.push(this.currTag);
    this.currTag= '';
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }
}
