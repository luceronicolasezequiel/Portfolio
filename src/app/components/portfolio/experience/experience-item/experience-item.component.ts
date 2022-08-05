import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/models/experience';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css']
})
export class ExperienceItemComponent implements OnInit {

  @Input() experience: Experience = { position: '', organization: '', periodFrom: '', periodTo: '', tasks: [{ name: '' }] };

  constructor() { }

  ngOnInit(): void {
  }

}
