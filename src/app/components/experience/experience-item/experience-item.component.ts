import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/Experience';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit {

  @Input() experience: Experience = { position: '', organization: '', period: '', tasks: [{ name: '' }], habilitys: [{ name: '' }] };

  constructor() { }

  ngOnInit(): void {
  }

}
