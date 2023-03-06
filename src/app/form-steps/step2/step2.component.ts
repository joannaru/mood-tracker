import { EStep2 } from './../../enums/step2.enum';
import { minOneOptionValidator } from 'src/app/validators/min-one-option-validator.validator';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SOCIAL_NETWORKS_OPTIONS } from 'src/app/models/data';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss'],
})
export class Step2Component implements OnInit, OnDestroy {
  sub: Subscription = new Subscription();
  @Input() data!: { [key: string]: any };
  @Input() readonly!: boolean;
  socialNetworksOptions = SOCIAL_NETWORKS_OPTIONS;
  EStep2 = EStep2;

  friendsIndex = this.socialNetworksOptions
    .map((x) => x.name)
    .findIndex((x) => x === 'Friends');

  form = this.fb.group(
    {
      [EStep2.SOCIAL_NETWORKS]: this.fb.array([]),
      [EStep2.FRIENDS]: [
        { value: '', disabled: true },
        { validators: [Validators.required, Validators.minLength(3)] },
      ],
      [EStep2.FOOD]: this.fb.array([], Validators.required),
      [EStep2.WORK]: ['', Validators.required],
    },
    {
      validators: [minOneOptionValidator('socialNetworks')],
    }
  );

  get socialNetworks() {
    return this.form.controls[EStep2.SOCIAL_NETWORKS] as FormArray;
  }

  get friends() {
    return this.form.controls[EStep2.FRIENDS];
  }

  get food() {
    return this.form.controls[EStep2.FOOD] as FormArray;
  }

  get work() {
    return this.form.controls[EStep2.WORK];
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //init EStep2.SOCIAL_NETWORKS
    this.initSocialNetworksArray();
    this.onFormChanges();
    this.readSavedData();
    this.disableForm();
  }

  onFormChanges() {
    const subValueChanges = this.form.valueChanges.subscribe((currentForm) => {
      this.form.markAllAsTouched();

      let friendsChecked = null;
      try {
        friendsChecked =
          currentForm.socialNetworks[this.friendsIndex]['Friends'];
      } catch (error) {
        // no dynamic field needed
      }

      // dynamic field textarea form.friends
      if (friendsChecked) {
        if (friendsChecked === true && this.friends.disabled) {
          this.friends.enable({ emitEvent: false }); // enable and prevent call valueChanges (event infinite loop)
        }
      } else {
        if (friendsChecked === false && this.friends.enabled) {
          this.friends.disable({ emitEvent: false });
        }
      }
    });
    
    this.sub.add(subValueChanges);
  }

  disableForm() {
    if (this.readonly === true) {
      this.form.disable();
    }
  }

  readSavedData() {
    // read saved data
    if (this.data) {
      // dynamic inputs
      if (this.data.food && this.data.food instanceof Array) {
        for (let i = 0; i < this.data.food.length; i++) {
          this.addFood();
        }
      }
      this.form.setValue(this.data);
    }
  }

  initSocialNetworksArray() {
    for (let option of this.socialNetworksOptions) {
      this.socialNetworks.push(
        this.fb.group({
          [option.name]: false,
        })
      );
    }
  }

  socialNetworkVal(idx: number) {
    let fg = this.socialNetworks.controls[idx] as FormGroup;
    let fcs = fg.controls;
    return Object.values(fcs)[0].value;
  }

  addFood() {
    const foodForm = this.fb.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.food.push(foodForm);
  }

  removeFood(index: number) {
    this.food.removeAt(index);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
