import { HttpErrorResponse } from "@angular/common/http";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService, Credentials } from "@services/authentication.service";
import { first } from "rxjs/operators";

@Component({ templateUrl: 'template.html' })
export class RegisterComponent {

	title: string;
	error: string;
	loading: boolean;

	constructor(
		private service: AuthenticationService,
		private router: Router
	) {
		this.title = 'Registration';
		this.error = '';
		this.loading = false;
	}

	action(credentials: Credentials) {

		this.loading = true;

		const navigate = () => this.router.navigate(['']);

		const error = (error: HttpErrorResponse) => {
			this.error = error.error.message;
			this.loading = false;
		}

		this.service.register(credentials.email, credentials.password)
			.pipe(first())
			.subscribe(navigate, error);
	}
}