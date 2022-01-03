import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Service } from 'src/app/models/service.model';
import { ServicesService } from 'src/app/services/services.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.less']
})
export class ServicesListComponent implements OnInit {
  routing = environment.routing;
  services$: Observable<Service[]>;
  readonly columns = ['name', 'desc', 'count', 'price', 'action'];
  // tabsList = ['Товары', 'Группы'];

  constructor(private serviceService: ServicesService) {
    this.services$ = this.serviceService.getAll$();
  }

  ngOnInit(): void {}

  // get getTabActiveIndex(): number {
  //   return this.tabsList.findIndex(
  //     (status: ContractStatus) => status._id === this.tabActive._id
  //   );
  // }

  edit(service: Service): void {}

  delete(service: Service): void {
    this.serviceService.delete$(service._id);
  }
}
