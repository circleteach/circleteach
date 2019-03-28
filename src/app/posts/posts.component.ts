import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  //TODO Input Decorator once we get data model

  private userName: string = "Jay Example";
  private userTitle: string = "Example grade Example at Example School";
  private postAge: string = "2 Days ago";
  private postContent: string = "Some days I just feel like, Example. Then I go Example and keep exampling myself. Everyday all day!";
  private stars: number = 52;

  //RUn this command before ending 3/27/2019
  //ng config schematics.@schematics/angular:component.styleext scss

  starClick(){

  }

  commentClick(){

  }

  downloadClick(){

  }

  //Navigate to user page on profile image or name click
  profileClick(){

  }

  //TODO after tag functionality is built
  tagClick(){

  }
}
