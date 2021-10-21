import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-responsible-person-panel',
  templateUrl: './responsible-person-panel.component.html',
  styleUrls: ['./responsible-person-panel.component.less'],
})
export class ResponsiblePersonPanelComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.initForm();
  }

  ngOnInit(): void {}

  initForm(): void {
    this.form = this.formBuilder.group({
      fullName: new FormControl(null, [Validators.required]),
      basis: new FormControl(null, [Validators.required]),
    });
  }
}
