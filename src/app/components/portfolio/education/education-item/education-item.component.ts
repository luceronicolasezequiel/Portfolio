import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/models/education';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

  @Input() education: Education = { organization: '', title: '', periodFrom: '', periodTo: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
