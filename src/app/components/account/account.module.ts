import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RegisterComponent } from './register.component';
import { AccountRoutingModule } from './account-routing.module';
import { CredentialsComponent } from './credentials/credentials.component';
import { LoginComponent } from './login.component';



@NgModule({
	declarations: [
		CredentialsComponent,
		LoginComponent,
		RegisterComponent
	],
	imports: [
		CommonModule,
		AccountRoutingModule,
		MatCardModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatFormFieldModule,
		MatInputModule,
	]
})
export class AccountModule { }
