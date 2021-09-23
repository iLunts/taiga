import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    private templatePdfService: TemplatePdfService,
    private router: Router
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

  createBaseOnInvoice(contract: Contract): void {
    this.router.navigate([this.routing.admin.invoice.create], {
      queryParams: {
        contractorId: contract.contractor._id,
        contractId: contract._id,
      },
    });
    // this.router.navigate([this.routing.admin.invoice.create], {
    //   state: { contract: data },
    // });
  }

  createBaseOnAct(data): void {}

  createBaseOnReference(data): void {}
}
