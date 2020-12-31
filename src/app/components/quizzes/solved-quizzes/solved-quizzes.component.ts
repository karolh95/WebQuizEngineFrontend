import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CustomDataSource } from '@models/custom-data-source';
import { Quiz } from '@models/quiz';
import { SolvedQuizzesDataSource } from '@models/solved-quizzes-data-source';
import { CompletedQuiz, QuizzesService } from '@services/quizzes.service';
import { tap } from 'rxjs/operators';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';

@Component({
	selector: 'app-solved-quizzes',
	templateUrl: './solved-quizzes.component.html',
	styleUrls: ['./solved-quizzes.component.css']
})
export class SolvedQuizzesComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = ['id', 'completedAt', 'action'];
	dataSource: CustomDataSource<CompletedQuiz>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.dataSource = new SolvedQuizzesDataSource(this.quizzesService);
		this.dataSource.loadData();
	}

	ngAfterViewInit() {

		this.dataSource.counter
			.pipe(tap(count => this.paginator.length = count))
			.subscribe();

		this.paginator.page
			.subscribe(
				() => this.dataSource.loadData(this.paginator.pageIndex)
			);
	}

	show(quiz: CompletedQuiz) {

		this.quizzesService.getById(quiz.id).subscribe(
			quiz => {
				this.dialog.open(QuizDialogComponent, { data: quiz });
			}
		)
	}
}
