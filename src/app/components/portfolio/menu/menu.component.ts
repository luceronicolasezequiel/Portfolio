import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { GlobalService } from 'src/app/services/global.service';
import { LoginComponent } from '../../login/login.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn$ = of(false);

  constructor(
    public authService: AuthService,
    public globalService: GlobalService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
  }

  onOpenModal() {
    const modalRef = this.modalService.open(
      LoginComponent,
      {
        scrollable: false,
        keyboard: false,
        backdrop: 'static'
      }
    );
  }

  onLogout() {
    this.authService.logout();
  }

}
