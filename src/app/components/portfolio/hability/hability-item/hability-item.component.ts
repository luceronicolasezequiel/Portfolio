import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { DeleteHabilityRequest, Hability } from 'src/app/models/hability';
import { AuthService } from 'src/app/services/auth.service';
import { HabilityService } from 'src/app/services/hability.service';
import { HabilityEditComponent } from '../hability-edit/hability-edit.component';

@Component({
  selector: 'app-hability-item',
  templateUrl: './hability-item.component.html',
  styleUrls: ['./hability-item.component.css']
})
export class HabilityItemComponent implements OnInit {

  @Input() hability: Hability = { id: 0, name: '', percentage: 100 };
  @Output() updateEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  isLoggedIn$ = of(false);
  
  constructor(
    public authService: AuthService,
    private habilityService: HabilityService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onOpenModal(){
    const modalRef = this.modalService.open(
      HabilityEditComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.hability = this.hability;

    modalRef.result.then(
      (result) => {
        if (result) {
          this.hability = result;
          this.updateEvent.emit();
        }
      },
      (reason) => {}
    );
  }

  onDelete(hability: Hability) {
    try {
      const request = new DeleteHabilityRequest();
      request.id = hability.id;

      this.habilityService.delete(request).subscribe({
        next: () => {
          this.deleteEvent.emit();
          this.toastrService.success('Habilidad eliminada con éxito!');
        },
        error: (err) => this.toastrService.error('Hubo un error al eliminar la habilidad!')
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

}
