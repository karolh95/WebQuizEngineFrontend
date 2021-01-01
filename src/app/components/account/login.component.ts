import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthenticationService, Credentials } from "@services/authentication.service";
import { first } from "rxjs/operators";

@Component({ templateUrl: 'template.html' })
export class LoginComponent implements OnInit {

	title: string;
	error: string;
	loading: boolean;

	private returnUrl: string;

	constructor(
		private service: AuthenticationService,
		private router: Router,
		private route: ActivatedRoute
	) {
		this.title = 'Login';
		this.error = '';
	}

	ngOnInit() {
		this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
	}

	action(credentials: Credentials) {

		this.error = '';
		this.loading = true;

		const navigate = () => this.router.navigate([this.returnUrl]);

		const error = () => {
			this.error = 'Bad credentials';
			this.loading = false;
		};

		this.service.login(credentials.email, credentials.password)
			.pipe(first())
			.subscribe(navigate, error);

	}

}