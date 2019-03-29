import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-personalinfo',
  templateUrl: './personalinfo.component.html',
  styleUrls: ['./personalinfo.component.scss']
})
export class PersonalinfoComponent implements OnInit {
  // TODO Input Decorator once we get data model

  userName = 'Jay Example';
  userTitle = 'Example grade Example at Example School';

  constructor() {}

  ngOnInit() {}
}
