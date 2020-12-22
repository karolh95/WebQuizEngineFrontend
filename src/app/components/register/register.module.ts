import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register.component';



@NgModule({
  declarations: [
	  RegisterComponent
  ],
  imports: [
	CommonModule,
	MatCardModule,
	MatInputModule,
	MatButtonModule,
	ReactiveFormsModule
  ]
})
export class RegisterModule { }
