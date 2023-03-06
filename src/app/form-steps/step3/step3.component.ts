import { Component, Input, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { EStep3 } from 'src/app/enums/EStep3.enum';
import { RELAX_OPTIONS } from 'src/app/models/data';
import { minOneOptionValidator } from 'src/app/validators/min-one-option-validator.validator';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'],
})
export class Step3Component implements OnInit {
  @Input() data!: Object;
  @Input() readonly!: boolean;
  EStep3 = EStep3;
  checkboxesData = RELAX_OPTIONS;
  form = this.fb.group(
    {
      [EStep3.RELAX]: this.fb.array([], Validators.minLength(1)),
    },
    { validators: [minOneOptionValidator('relax')] }
  );

  get relax() {
    return this.form.controls[EStep3.RELAX] as FormArray;
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addCheckboxesToForm();
    if (this.data) {
      this.form.setValue(this.data);
    }
    if (this.readonly === true) {
      this.form.disable();
    }
  }

  addCheckboxesToForm() {
    this.checkboxesData.forEach((val, idx) => {
      const name: string = this.checkboxesData[idx];
      this.relax.push(
        this.fb.group({
          [name]: [false],
        })
      );
    });
  }
}
