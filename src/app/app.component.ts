import { Component } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[
    {
      provide: STEPPER_GLOBAL_OPTIONS, useValue:{showError: true}
    }
  ]
})
export class AppComponent {
  title = 'mood-tracker';


  constructor(private router: Router){

  }

}
