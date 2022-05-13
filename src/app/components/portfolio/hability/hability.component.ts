import { Component, Input, OnInit } from '@angular/core';
import { Hability } from 'src/app/models/Hability';
import { HabilityService } from 'src/app/services/hability.service';

@Component({
  selector: 'app-hability',
  templateUrl: './hability.component.html',
  styleUrls: ['./hability.component.css']
})
export class HabilityComponent implements OnInit {

  @Input() title = '';
  habilitys: Hability[] = [];

  constructor(
    private habilityService: HabilityService
  ) { }

  ngOnInit(): void {
    this.getHabilitys();
  }

  getHabilitys() {
    this.habilityService.getHabilitys()
      .subscribe(habilitys => {
        this.habilitys = habilitys.filter(hability => !!hability.icon);
      });
  }
}
