import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class QuizzesService {

	private endpoint: string;

	constructor(
		private http: HttpClient
	) {
		this.endpoint = `${environment.api}/quizzes`;
	}

	saveQuiz(quiz: Quiz): Observable<Quiz> {
		return this.http.post<Quiz>(this.endpoint, quiz);
	}

	updateQuiz(quiz: Quiz): Observable<Quiz> {
		const id = quiz.id;
		return this.http.put<Quiz>(`${this.endpoint}/${id}`, quiz);
	}

	getQuizById(id: number): Observable<Quiz> {
		return this.http.get<Quiz>(`${this.endpoint}/${id}`);
	}

	getQuizzes(request): Observable<Page<Quiz>> {
		const params = request;
		return this.http.get<Page<Quiz>>(this.endpoint, { params });
	}

	getMyQuizzes(request): Observable<Page<Quiz>> {
		const params = request;
		return this.http.get<Page<Quiz>>(`${this.endpoint}/my`, { params });
	}

	solveQuiz(quiz: Quiz): Observable<Answer> {
		const id = quiz.id;
		const body = { answer: quiz.answer };
		return this.http.post<Answer>(`${this.endpoint}/${id}/solve`, body);
	}

	getCompletedQuizzes(request): Observable<Page<CompletedQuiz>> {
		const params = request;
		return this.http.get<Page<CompletedQuiz>>(`${this.endpoint}/completed`, { params });
	}

	deleteQuiz(quiz: Quiz): Observable<Quiz> {
		const id: number = quiz.id;
		return this.http.delete<Quiz>(`${this.endpoint}/${id}`);
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

export interface Quiz {

	id?: number;
	title: string;
	text: string;
	options: string[];
	answer?: number[];
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
