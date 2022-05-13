import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() textButton = "";
  @Input() nameButton = "";
  @Input() typeButton = "button";
  @Input() classButton = "btn-primary btn-lg";

  constructor() { }

  ngOnInit(): void {
  }

}
