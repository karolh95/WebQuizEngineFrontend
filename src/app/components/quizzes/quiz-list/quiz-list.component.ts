import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Quiz } from '@models/quiz';
import { QuizDataSource } from '@models/quiz-data-source';
import { QuizzesService } from '@services/quizzes.service';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-quiz-list',
	templateUrl: './quiz-list.component.html',
	styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = ['id', 'title', 'text', 'action'];
	dataSource: QuizDataSource;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private quizzesService: QuizzesService) { }

	ngOnInit(): void {
		this.dataSource = new QuizDataSource(this.quizzesService);
		this.dataSource.loadQuizzes();

	}

	ngAfterViewInit() {

		this.dataSource.counter
			.pipe(tap(count => this.paginator.length = count))
			.subscribe();

		this.paginator.page
			.subscribe(() => {
				this.dataSource.loadQuizzes(this.paginator.pageIndex);
			});
	}

	show(quiz: Quiz) {
		console.log(quiz);
	}
}
