import { Component, OnInit } from "@angular/core";
import { MatButtonToggleChange } from "@angular/material";

@Component({
  selector: "app-activitylog",
  templateUrl: "./activitylog.component.html",
  styleUrls: ["./activitylog.component.scss"]
})
export class ActivitylogComponent implements OnInit {
  toggle: boolean = true;

  constructor() {}

  ngOnInit() {}

  toggleView(change: MatButtonToggleChange) {
    this.toggle = change.value;
  }
}
