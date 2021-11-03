import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-service-panel',
  templateUrl: './service-panel.component.html',
  styleUrls: ['./service-panel.component.less']
})
export class ServicePanelComponent implements OnInit {
  services$: Observable<Service[]>;

  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.services$ = this.serviceService.getAll$();
  }
}
