import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthenticationService } from '@services/authentication.service';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UnauthenticatedGuard implements CanActivate {

	constructor(
		private router: Router,
		private authenticationService: AuthenticationService
	) { }

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		const user = this.authenticationService.userValue;
		if (user) {
			this.router.navigate(['/']);
			return false;
		}

		return true;

	}

}
