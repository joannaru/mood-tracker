import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupedObservable } from 'rxjs';
import { createCheckboxesValidator } from 'src/app/validators/checkboxes-validator.validator';

@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {

  @Input() data!:keyable;
  @Input() readonly!:boolean;

  socialNetworksOptions = [
    {name:'Online chat', icon: 'far fa-comments', color:'app-accent'},
    {name:'Phone chat', icon: 'fas fa-phone', color:'app-accent'},
    {name:'Friends', icon: 'fas fa-user-friends', color:'app-accent'},
    {name:'Date', icon: 'far fa-heart', color:'app-accent'},
    {name:'Home', icon: 'fas fa-home', color:'app-accent'},
  ];

  friendsIndex = this.socialNetworksOptions.map(x=>x.name).findIndex(x=>x==='Friends')

  form=this.fb.group({
    socialNetworks: this.fb.array([]),
    friends: [{value:'', disabled: true}, {validators:[Validators.required, Validators.minLength(3)]}],
    food: this.fb.array([], Validators.required),
    work: ['', Validators.required],
  },
  {validators:[
    createCheckboxesValidator(this.socialNetworksOptions.map(x=>x.name))], 
  }
  )


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    //init form.socialNetworks
    this.initSocialNetworksArray()

    this.form.valueChanges.subscribe(currentForm=>{
      let friendsChecked=null;
      try{
        friendsChecked = currentForm.socialNetworks[this.friendsIndex]['Friends'];
      }catch(error){
        // no dynamic field needed
      }

      // dynamic field textarea form.friends
      if( friendsChecked){

        if(friendsChecked === true && this.friends.disabled){
          this.friends.enable({emitEvent:false}); // enable and prevent call valueChanges (event infinite loop)
        }
      }else{
        if(friendsChecked===false && this.friends.enabled){
          this.friends.disable({emitEvent:false})
        }
      }
    })

    // read saved data

    if(this.data){
      // dynamic inputs
      if(this.data.food && this.data.food instanceof Array){
        for(let i=0;i<this.data.food.length; i++){
          this.addFood()
        }
      }
      this.form.setValue(this.data);
    }
    if(this.readonly===true){
      this.form.disable();
    }
  }

  initSocialNetworksArray(){
    for(let option of this.socialNetworksOptions){
      this.socialNetworks.push(
        this.fb.group({
          [option.name]:false
        }
        )
      )
    }
    console.log(this.socialNetworks.controls);
  }

  get socialNetworks(){
    return this.form.controls.socialNetworks as FormArray;
  }

  socialNetworkVal(idx:number){
      let fg = this.socialNetworks.controls[idx] as FormGroup;
      let fcs =  fg.controls;
    return Object.values(fcs)[0].value;

    
  }

  get friends(){
    return this.form.controls.friends;
  }

  get food(){
    return this.form.controls.food as FormArray;
  }

  get work(){
    return this.form.controls.work;
  }

  addFood(){
   const foodForm =  this.fb.group({
      name:['',Validators.required], 
      amount:['', Validators.required]
    })

    this.food.push(foodForm);
  }

  removeFood(index:number){
    this.food.removeAt(index);
  }

}

export interface keyable {
  [key: string]: any  
}