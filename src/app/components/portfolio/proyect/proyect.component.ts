import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Proyect } from 'src/app/models/proyect';
import { ProyectService } from 'src/app/services/proyect.service';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {

  @Input() title = '';
  proyects: Proyect[] = [];

  constructor(
    private proyectService: ProyectService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.getProyects();
  }

  getProyects() {
    try {
      this.proyectService.getAll().subscribe({
        next: (response) => this.proyects = response
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

}
