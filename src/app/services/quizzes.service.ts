import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Quiz } from '@models/quiz';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class QuizzesService {

	constructor(
		private http: HttpClient
	) { }

	save(quiz: Quiz): Observable<Quiz> {
		return this.http.post<Quiz>(`${environment.api}/quizzes`, quiz);
	}

	get(request): Observable<Page<Quiz>> {
		const params = request;
		return this.http.get<Page<Quiz>>(`${environment.api}/quizzes`, { params });
	}
}

export interface Page<T> {

	last: boolean;
	first: boolean;
	empty: boolean;

	content: T[];

	number: number;
	size: number;
	numberOfElements: number;
	totalPages: number;
	totalElements: number;
}
