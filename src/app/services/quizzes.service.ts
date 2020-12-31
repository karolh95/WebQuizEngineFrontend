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

	getById(id: number): Observable<Quiz> {
		return this.http.get<Quiz>(`${environment.api}/quizzes/${id}`);
	}

	get(request): Observable<Page<Quiz>> {
		const params = request;
		return this.http.get<Page<Quiz>>(`${environment.api}/quizzes`, { params });
	}

	solve(quiz: Quiz): Observable<Answer> {
		const id = quiz.id;
		const body = { answer: quiz.answer };
		return this.http.post<Answer>(`${environment.api}/quizzes/${id}/solve`, body);
	}

	getCompleted(request): Observable<Page<CompletedQuiz>> {
		const params = request;
		return this.http.get<Page<CompletedQuiz>>(`${environment.api}/quizzes/completed`, { params });
	}
}

export interface Answer {
	success: boolean;
	feedback: string;
}

export interface CompletedQuiz {
	id: number;
	completedAt: Date;
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
