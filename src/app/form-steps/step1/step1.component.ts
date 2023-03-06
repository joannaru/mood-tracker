import { EStep1 } from './../../enums/step1.enum';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.scss'], 

})
export class Step1Component implements OnInit {
  EStep1 = EStep1;
  @Input() data!:Object;
  @Input() readonly!:boolean;

  moods =[
    {name:'great', icon:'grin', color:'darkgreen'},
    {name:'good', icon:'smile', color:'green'},
    {name:'so-so', icon:'meh', color:'gold'},
    {name:'bad', icon:'frown', color:'orange'},
    {name:'awfully', icon:'tired', color:'red'},
  ]

  form = this.fb.group({
    [EStep1.DATE]: [new Date(),{validators:[Validators.required]}], 
    [EStep1.MOOD_NAME]: [null,{validators:[Validators.required, Validators.pattern('('+this.moods.map(x=>x.name).join('|')+')')]}]
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    // assign previously saved form data from localStorage
    if(this.data){
      this.form.setValue(this.data);
    }
    if(this.readonly===true){
      this.form.disable();
    }
    
  }

  get date(){
    return this.form.controls.date;
  }

  get moodName(){
    return this.form.controls[EStep1.MOOD_NAME];
  }

}
