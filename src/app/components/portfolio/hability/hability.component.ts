import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { of } from 'rxjs';
import { Hability } from 'src/app/models/hability';
import { AuthService } from 'src/app/services/auth.service';
import { HabilityService } from 'src/app/services/hability.service';
import { HabilityAddComponent } from './hability-add/hability-add.component';

@Component({
  selector: 'app-hability',
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css']
})
export class HabilityComponent implements OnInit {

  @Input() title = '';

  habilities: Hability[] = [];
  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    private habilityService: HabilityService,
    private toastrService: ToastrService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.getHabilities();
  }

  getHabilities() {
    try {
      this.habilityService.getAll().subscribe({
        next: (response) => this.habilities = response
      });
    } catch (error) {
      this.toastrService.error('Error!', (error as Error).message);
    }
  }

  onOpenModal() {
    const modalRef = this.modalService.open(
      HabilityAddComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );

    modalRef.result.then(
      (result) => {
        if (result) {
          this.getHabilities();
        }
      },
      (reason) => {}
    );
  }

}
