import { Component, Input, OnInit } from '@angular/core';
import { Hability } from 'src/app/models/Hability';

@Component({
  selector: 'app-hability-item',
  templateUrl: './hability-item.component.html',
  styleUrls: ['./hability-item.component.css']
})
export class HabilityItemComponent implements OnInit {

  @Input() hability: Hability = { name: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
