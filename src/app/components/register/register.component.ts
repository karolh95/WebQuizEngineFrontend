import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	registerForm: FormGroup;

	submitted = false;
	loading = false;
	error = '';

	get email() {
		return this.registerForm.controls.email;
	}

	get password() {
		return this.registerForm.controls.password;
	}

	constructor(
		private authenticationService: AuthenticationService,
		private formBuilder: FormBuilder,
		private router: Router
	) { }

	ngOnInit(): void {
		const passwordMinLength = 5;

		const emailValidators = [
			Validators.required,
			Validators.email
		];

		const passwordValidators = [
			Validators.required,
			Validators.minLength(passwordMinLength)
		];

		this.registerForm = this.formBuilder.group({
			email: ['', Validators.compose(emailValidators)],
			password: ['', Validators.compose(passwordValidators)]
		})
	}

	onSubmit() {
		this.error = '';
		this.submitted = true;

		if (this.registerForm.invalid) {
			return;
		}

		this.loading = true;

		const navigate = () => this.router.navigate(['']);

		const error = err => {
			this.error = err;
			this.loading = false;
		};

		this.authenticationService.register(this.email.value, this.password.value)
			.pipe(first())
			.subscribe(navigate, error);
	}

	isEmailError() {
		return this.isError(this.email);
	}

	isPasswordError() {
		return this.isError(this.password);
	}

	private isError(control: AbstractControl) {
		return (this.submitted || control.touched) && control.errors;
	}
}
