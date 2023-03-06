import { ETask } from './../../enums/task.enum';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  providers: [
    { provide: NG_VALIDATORS, useExisting: TaskComponent, multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: TaskComponent, multi: true },
  ],
})
export class TaskComponent
  implements OnInit, OnDestroy, Validator, ControlValueAccessor
{
  ETask = ETask;
  form = this.fb.group({
    [ETask.PROJECT_NAME]: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(20),
        ],
      },
    ],
    [ETask.TASK_NAME]: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(30),
        ],
      },
    ],
    [ETask.HOURS]: [
      null,
      { validators: [Validators.required, Validators.pattern('[0-9]+')] },
    ],
    [ETask.STATE]: [
      null,
      {
        validators: [
          Validators.required,
          Validators.pattern('(done|in progress)'),
        ],
      },
    ],
  });
  // for ControlValueAccessor implementation
  onValidatorChange = () => {};
  onTouched = () => {};
  onChangeSub!: Subscription;

  constructor(private fb: FormBuilder) {}

  get projectName() {
    return this.form.controls.projectName;
  }
  get taskName() {
    return this.form.controls.taskName;
  }
  get hours() {
    return this.form.controls.hours;
  }
  get state() {
    return this.form.controls.state;
  }

  ngOnInit(): void {
    const subValueChanges = this.form.valueChanges.subscribe((currentForm) => {
      this.form.markAllAsTouched();
    });
  }

  ngOnDestroy() {
    this.onChangeSub.unsubscribe();
  }

  // implement Validator
  validate(control: AbstractControl): ValidationErrors | null {
    if (!this.form.valid) {
      return { invalidTaskForm: true };
    }

    return null;
  }
  registerOnValidatorChange(fn: () => void) {
    this.onValidatorChange = fn;
  }

  //implement ControlValueAccessor
  writeValue(value: any) {
    this.form.patchValue(value, { emitEvent: false });
  }
  registerOnChange(fn: any) {
    this.onChangeSub = this.form.valueChanges.subscribe(fn);
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean) {
    isDisabled ? this.form.disable() : this.form.enable();
  }
}
