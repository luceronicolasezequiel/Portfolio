import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Proyect } from 'src/app/models/proyect';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectService } from 'src/app/services/proyect.service';
import { ProyectAddComponent } from './proyect-add/proyect-add.component';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {

  @Input() title = '';

  proyects: Proyect[] = [];
  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private proyectService: ProyectService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
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

  onOpenModal() {
    const modalRef = this.modalService.open(
      ProyectAddComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.result.then(
      (result) => {
        if (result) {
          this.getProyects();
        }
      },
      (reason) => {}
    );
  }

}
