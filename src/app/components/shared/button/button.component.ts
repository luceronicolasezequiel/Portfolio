import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() textButton = "";
  @Input() nameButton = "";
  @Input() typeButton = "button";
  @Input() isDisabled = false;
  @Input() classButton = "btn btn-primary btn-lg";
  @Input() dataBsToggle = "";
  @Input() dataBsTarget = "";
  @Output() clickEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.clickEvent.emit();
  }
}
