import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.css']
})
export class InputTextComponent implements OnInit {
  @Input() textLabel = '';
  @Input() nameInput = '';
  @Input() typeInput = '';

  constructor() { }

  ngOnInit(): void {
  }

}
