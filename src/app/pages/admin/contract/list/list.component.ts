import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Contract } from 'src/app/models/contract.model';
import { Invoice } from 'src/app/models/invoice.model';
import { ContractService } from 'src/app/services/contract.service';
import { TemplatePdfService } from 'src/app/services/template-pdf.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-contract-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ContractListComponent implements OnInit {
  readonly columns = ['number', 'unp', 'status', 'action'];
  contracts$: Observable<Contract[]>;
  isLoaded: boolean;
  routing = environment.routing;

  constructor(
    private contractService: ContractService,
    private templatePdfService: TemplatePdfService
  ) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.contracts$ = this.contractService.getAll$();
  }

  delete(item: Invoice): void {
    if (item) {
      this.contractService.delete$(item._id);
    }
  }

  downloadPdf(data: Contract): void {
    this.templatePdfService.downloadPdf('contract', data);
  }
}
