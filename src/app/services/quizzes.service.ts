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
}
