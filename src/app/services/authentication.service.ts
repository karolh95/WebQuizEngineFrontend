import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@models/user';
import { map } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private userSubject: BehaviorSubject<User>;
	public user: Observable<User>;

  constructor(
	  private router: Router,
	  private http: HttpClient
  ) {
	  this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
	  this.user = this.userSubject.asObservable();
   }

   public get userValue(): User {
	   return this.userSubject.value;
   }

   login(email: string, password: string){
	   const token = btoa(email+':'+password);
	   return this.http.get<any>(`${environment.api}/login`,
	    {
			headers:{
				Authorization: `Basic ${token}`
			}
		})
	   		.pipe(map(user=>{
				   user.authData = token;
				   localStorage.setItem('user', JSON.stringify(user));
				   this.userSubject.next(user);
				   console.log(user);
				   
				   return user;
			   }));
   }

   logout() {
	   localStorage.removeItem('user');
	   this.userSubject.next(null);
	   this.router.navigate(['/login']);
   }
}
