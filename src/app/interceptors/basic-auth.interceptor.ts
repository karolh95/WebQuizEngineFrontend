import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '@services/authentication.service';
import { environment } from '@env/environment';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

  constructor(
	  private authenticationService: AuthenticationService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
	
	const user = this.authenticationService.userValue;
	const isLoggedIn = user && user.authData;
	const isApiUrl = request.url.startsWith(environment.api);

	if (isLoggedIn && isApiUrl){
		request = request.clone({
			setHeaders: {
				Authorization: `Basic ${user.authData}`
			}
		})
	}
	return next.handle(request);
  }
}
