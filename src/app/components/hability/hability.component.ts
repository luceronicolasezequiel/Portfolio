import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-hability',
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css']
})
export class HabilityComponent implements OnInit {
  @Input() title = '';

  constructor() { }

  ngOnInit(): void {
  }
}
