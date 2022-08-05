import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Hability } from 'src/app/models/hability';
import { HabilityService } from 'src/app/services/hability.service';

@Component({
  selector: 'app-hability',
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css']
})
export class HabilityComponent implements OnInit {

  @Input() title = '';
  habilities: Hability[] = [];

  constructor(
    private habilityService: HabilityService,
    private toastrService: ToastrService
  ) { }

  ngOnInit(): void {
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

}
