import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContractorService } from 'src/app/services/contractor.service';

@Component({
  selector: 'app-contractor-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less'],
})
export class ContractorCreateComponent implements OnInit {
  @Output() close = new EventEmitter<boolean>();
  form: FormGroup;

  readonly maskUNP = {
    guide: false,
    modelClean: true,
    mask: [/\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/],
  };

  constructor(
    private afs: AngularFirestore,
    private formBuilder: FormBuilder,
    private contractorService: ContractorService
  ) {}

  ngOnInit(): void {
    this.setupForm();
    this.form.valueChanges.subscribe((obj) => {
      obj.info.unp = obj.info.unp.replace(/\D+/g, '');
    });
  }

  setupForm(): void {
    this.form = this.formBuilder.group({
      _id: new FormControl(this.afs.createId(), [Validators.required]),
      info: new FormGroup({
        fullName: new FormControl(null, [Validators.required]),
        fullNameBel: new FormControl(null),
        name: new FormControl(null, [Validators.required]),
        nameBel: new FormControl(null),
        registrationDate: new FormControl(null),
        shortName: new FormControl(null, [Validators.required]),
        shortNameBel: new FormControl(null),
        unp: new FormControl(null, [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
        ]),
      }),
      juridicalAddress: new FormGroup({}),
      mailingAddress: new FormControl({}),
    });
  }

  save(): void {
    this.contractorService.add$(this.form.value).subscribe(() => {
      this.cancel();
    });
  }

  cancel(): void {
    this.close.emit(true);
  }
}
