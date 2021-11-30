import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'], 
  providers: [
    {provide: NG_VALIDATORS, useExisting: TaskComponent, multi: true}, 
    {provide: NG_VALUE_ACCESSOR, useExisting:TaskComponent, multi:true}
]
})
export class TaskComponent implements OnInit, OnDestroy, Validator, ControlValueAccessor {
  form =  this.fb.group({
    projectName: [null, {validators:[Validators.required, Validators.minLength(5), Validators.maxLength(20)]}],
    taskName:[null, {validators:[Validators.required, Validators.minLength(3), Validators.maxLength(30)]}],
    hours:[null, {validators:[Validators.required, Validators.pattern('[0-9]+')]}],
    state:[null, {validators:[Validators.required,Validators.pattern('(done|in progress)')]}]  
  })
  // for Validator implementation
  onValidatorChange = ()=>{};
  // for ControlValueAccessor implementation
  onChangeSub!: Subscription;
  onTouched = ()=>{}
  disabled = false;

  constructor(private fb: FormBuilder) { }


  get projectName(){
    return this.form.controls.projectName;
  }
  get taskName(){
    return this.form.controls.taskName;
  }
  get hours(){
    return this.form.controls.hours;
  }
  get state(){
    return this.form.controls.state;
  }
  ngOnInit(): void {
  }
  ngOnDestroy(){
    // clean after registerOnChange()
    this.onChangeSub.unsubscribe()
  }
  // implement Validator
  validate(control: AbstractControl): ValidationErrors | null {
    if(!this.form.valid){
      return {'invalidTaskForm': true}
    }

    return null;
  }
  registerOnValidatorChange(fn: () => void){
    this.onValidatorChange = fn;

  }

  //implement ControlValueAccessor
  writeValue(value: any){
    console.log('writeValue: ',value);
    this.form.patchValue(value, {emitEvent:false})
  }
  registerOnChange(fn: any){
    this.onChangeSub = this.form.valueChanges.subscribe(fn)
  }
  registerOnTouched(fn: any){
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean){
    isDisabled ? this.form.disable() : this.form.enable();
  }
}


