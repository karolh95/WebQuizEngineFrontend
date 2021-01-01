import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credentials } from '@services/authentication.service';

@Component({
	selector: 'app-credentials',
	templateUrl: './credentials.component.html',
	styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {

	@Input() title: string;
	@Input() error: string;
	@Input() loading: boolean;
	@Output() action: EventEmitter<Credentials>;

	loginForm: FormGroup;
	submitted = false;
	returnUrl: string;

	get email() {
		return this.loginForm.controls.email;
	}

	get password() {
		return this.loginForm.controls.password;
	}


	constructor(
		private builder: FormBuilder
	) {
		this.action = new EventEmitter<Credentials>();
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

		this.loginForm = this.builder.group({
			email: ['', Validators.compose(emailValidators)],
			password: ['', Validators.compose(passwordValidators)]
		});
	}

	onSubmit() {

		this.submitted = true;

		if (this.loginForm.invalid) {
			return;
		}

		const credentials: Credentials = {
			email: this.email.value,
			password: this.password.value
		};

		this.action.emit(credentials);
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
