import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss']
})
export class MessagingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public messageTitle = "Example User";
  public exampleName = "Example";
  public exampleMessageSnip = "Hi there I'm an example";
  public exDateStub ="Thur"

  //TODO Submit typed text, if there is any
  public messageSubmit(){

  }

}
