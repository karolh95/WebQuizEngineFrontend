import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from '@services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	emailExample = "Ex. user@user.com";
	passwordExample = "Ex. 12345";

	loginForm: FormGroup;
	loading = false;
	submitted = false;
	returnUrl: string;
	error = '';

	get email(){
		return this.loginForm.controls.email;
	}

	get password(){
		return this.loginForm.controls.password;
	}

  constructor(
	  private formBuilder: FormBuilder,
	  private route: ActivatedRoute,
	  private router: Router,
	  private authenticationService: AuthenticationService
  ) { 
	  if (this.authenticationService.userValue){
		  this.router.navigate(['/']);
	  }
  }

  ngOnInit(): void {

	const minPasswordLength = 5;

	const emailValidators = [
		Validators.required,
		Validators.email
	];

	const passwordValidators = [
		Validators.required,
		Validators.minLength(minPasswordLength)
	];

	this.loginForm = this.formBuilder.group({
		email: ['', Validators.compose(emailValidators)],
		password: ['', Validators.compose(passwordValidators)]
	});

	this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(){

	this.error = '';
	  this.submitted = true;

	  if (this.loginForm.invalid){
		  return;
	  }

	  this.loading = true;

	  const navigate = () => this.router.navigate([this.returnUrl]);
	  
	  const error = () => {
		  this.error = "Bad credentials";
		  this.loading = false;
		};

	  this.authenticationService.login(this.email.value, this.password.value)
			  .pipe(first())
			  .subscribe(navigate, error);
  }

	isEmailError(){
		return this.isError(this.email);
	}

	isPasswordError(){
		return this.isError(this.password);
	}

	private isError(control: AbstractControl) {
		return (this.submitted || control.touched ) && control.errors;
	}
}