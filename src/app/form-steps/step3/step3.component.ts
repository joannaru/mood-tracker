import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { RELAX_OPTIONS } from 'src/app/models/data';
import { createCheckboxesValidator } from 'src/app/validators/checkboxes-validator.validator';
import { minOneOptionValidator } from 'src/app/validators/min-one-option-validator.validator';

@Component({
  selector: 'app-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss'], 

})
export class Step3Component implements OnInit {

  @Input() data!:Object;
  @Input() readonly!:boolean;

  checkboxesData=RELAX_OPTIONS;
  form = this.fb.group({
    relax: this.fb.array([], Validators.minLength(1))
  },
  {validators:[createCheckboxesValidator(this.checkboxesData), minOneOptionValidator(this.checkboxesData)]}
  )


  constructor(private fb: FormBuilder) { }
  
  ngOnInit(): void {
    this.addCheckboxesToForm();
    if(this.data){
      this.form.setValue(this.data);
    }
    if(this.readonly===true){
      this.form.disable();
    }
  }

  get relax(){
    return this.form.controls.relax as FormArray;
  }

  addCheckboxesToForm(){
    this.checkboxesData.forEach(
      (val, idx)=>
      {
        const name:string = this.checkboxesData[idx];
        this.relax.push(
          this.fb.group({
            [name]: [false]
          })
        )
      
      }
    )

    console.log(this.relax.controls);
  }

}