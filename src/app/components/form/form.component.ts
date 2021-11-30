import { Component } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS, useValue:{showError: true}
    }
  ]
})
export class FormComponent {
  title = 'form';
  isLinear = true;
  errorOnSave ='';



  constructor(private router: Router){

  }
  submit(form1:FormGroup, form2:FormGroup, form3:FormGroup){
    if(form1.valid===true && form2.valid===true && form3.valid===true){
      const mergedForm = {'form1':form1.getRawValue(), 'form2':form2.getRawValue(), 'form3':form3.getRawValue()}
      localStorage.setItem('SAVED_FORM',JSON.stringify(mergedForm))
      this.router.navigate(['/saved'])
    }else{
      this.errorOnSave ='All steps must be filled correctly'
    }
  }
}
