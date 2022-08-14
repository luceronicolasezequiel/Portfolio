import { Component, Input, OnInit } from '@angular/core';
import { Proyect } from 'src/app/models/proyect';

@Component({
  selector: 'app-proyect-item',
  templateUrl: './proyect-item.component.html',
  styleUrls: ['./proyect-item.component.css']
})
export class ProyectItemComponent implements OnInit {

  @Input() proyect: Proyect = { name: '', dateRealization: '', description: '', urls: '' };

  constructor() { }

  ngOnInit(): void {
  }

}
