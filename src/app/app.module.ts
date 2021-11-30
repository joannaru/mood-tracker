import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular MAterial
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { Step1Component } from './form-steps/step1/step1.component';
import { Step2Component } from './form-steps/step2/step2.component';
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import { TaskComponent } from './shared/task/task.component';
import { Step3Component } from './form-steps/step3/step3.component';
import { AppRoutingModule } from './modules/app-routing/app-routing.module';
import { ShowDataComponent } from './components/show-data/show-data.component';
import { FormComponent } from './components/form/form.component';
import { StartComponent } from './components/start/start.component';
import { CenterDirective } from './directives/center.directive';
import { StartWithCapitalPipe } from './pipes/start-with-capital.pipe';


@NgModule({
  declarations: [
    AppComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    TaskComponent,
    ShowDataComponent,
    FormComponent,
    StartComponent,
    CenterDirective,
    StartWithCapitalPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    // Angular Material
    MatToolbarModule,
    MatIconModule, 
    MatButtonModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatNativeDateModule, 
    MatInputModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
