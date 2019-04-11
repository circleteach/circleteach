import { Component, OnInit } from '@angular/core';
import { PostsComponent } from '../posts/posts.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public canwritepost: Boolean=false;  
  public activitylogview: Boolean=false;
}
