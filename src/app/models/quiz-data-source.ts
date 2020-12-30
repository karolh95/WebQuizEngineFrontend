import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Page, QuizzesService } from "@services/quizzes.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";
import { Quiz } from "./quiz";

export class QuizDataSource implements DataSource<Quiz> {

	private quiz = new BehaviorSubject<Quiz[]>([]);
	private loadingQuiz = new BehaviorSubject<boolean>(false);
	private count = new BehaviorSubject<number>(0);
	public counter = this.count.asObservable();

	constructor(
		private quizzesService: QuizzesService
	) { }

	connect(collectionViewer: CollectionViewer): Observable<Quiz[] | readonly Quiz[]> {
		return this.quiz.asObservable();
	}
	disconnect(collectionViewer: CollectionViewer): void {
		this.quiz.complete();
		this.loadingQuiz.complete();
		this.count.complete();
	}

	loadQuizzes(pageNumber: number = 0) {

		this.loadingQuiz.next(true);
		this.quizzesService.get({ page: pageNumber })
			.pipe(
				catchError(() => of([])),
				finalize(() => this.loadingQuiz.next(false))
			)
			.subscribe((result: Page<Quiz>) => {

				this.quiz.next(result.content);
				this.count.next(result.totalElements);
			});
	}
}
