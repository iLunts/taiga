import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Contractor } from 'src/app/models/company.model';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-panel',
  templateUrl: './contractor-panel.component.html',
  styleUrls: ['./contractor-panel.component.less']
})
export class ContractorPanelComponent implements OnInit {
  @Output() selected = new EventEmitter<Contractor>();
  @Input() contractor: Contractor;

  contractors$: Observable<Contractor[]>;
  form = new FormGroup({
      contractor: new FormControl(null, [Validators.required])
  });

  constructor(
    private contractorService: ContractorService,
  ) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch(): void {
    this.contractors$ = this.contractorService.getAll$();
  }

}
