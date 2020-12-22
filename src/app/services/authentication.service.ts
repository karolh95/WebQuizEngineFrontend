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

	private get storedUser(): User {
		return JSON.parse(localStorage.getItem("user"));
	}

	private set storedUser(user: User) {
		localStorage.setItem("user", JSON.stringify(user));
	}

	constructor(
		private router: Router,
		private http: HttpClient
	) {
		this.userSubject = new BehaviorSubject<User>(this.storedUser);
		this.user = this.userSubject.asObservable();
	}

	public get userValue(): User {
		return this.userSubject.value;
	}

	login(email: string, password: string) {
		const token = btoa(email + ':' + password);
		const options = { headers: { Authorization: `Basic ${token}` } };
		return this.http.get<any>(`${environment.api}/login`, options)
			.pipe(map(this.storeUser()));
	}

	register(email: string, password: string) {
		const body = { email, password };
		return this.http.post<User>(`${environment.api}/register`, body)
			.pipe(map(this.storeUser()))
	}

	logout() {
		localStorage.removeItem('user');
		this.userSubject.next(null);
		this.router.navigate(['/login']);
	}

	private storeUser() {
		return (user: User): User => {
			user.authData = btoa(user.email + ':' + user.authData)
			this.storedUser = user;
			this.userSubject.next(user);

			return user;
		}
	}
}
