import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Proyect } from 'src/app/models/proyect';
import { AuthService } from 'src/app/services/auth.service';
import { ProyectService } from 'src/app/services/proyect.service';
import { ProyectEditComponent } from '../proyect-edit/proyect-edit.component';

@Component({
  selector: 'app-proyect-item',
  templateUrl: './proyect-item.component.html',
  styleUrls: ['./proyect-item.component.css']
})
export class ProyectItemComponent implements OnInit {

  @Input() proyect: Proyect = { id: 0, name: '', dateRealization: '', description: '', urls: '' };
  @Output() updateEvent = new EventEmitter();

  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private proyectService: ProyectService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onOpenModal(){
    const modalRef = this.modalService.open(
      ProyectEditComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.proyect = this.proyect;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.proyect = result;
          this.updateEvent.emit();
        }
      },
      (reason) => {}
    );
  }

}
