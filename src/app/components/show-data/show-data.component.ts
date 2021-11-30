import { Component, OnInit } from '@angular/core';
import { RELAX_OPTIONS } from 'src/app/models/data';

@Component({
  selector: 'app-show-data',
  templateUrl: './show-data.component.html',
  styleUrls: ['./show-data.component.scss']
})
export class ShowDataComponent implements OnInit {
  saved = localStorage.getItem('SAVED_FORM') ?? null;
  formJSON={'form1':{},'form2':{},'form3':{}};
  constructor() { }

  ngOnInit(): void {
    
    if(this.saved)
    this.formJSON = JSON.parse(this.saved);
  }

}

