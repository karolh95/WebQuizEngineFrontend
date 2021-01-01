import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDataSource } from '@models/custom-data-source';
import { CompletedQuiz, QuizzesService } from '@services/quizzes.service';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Action, Columns } from './quiz-list.component';

@Component({
	selector: 'app-completed-quizzes',
	templateUrl: './template.html'
})
export class CompletedQuizzesComponent implements OnInit {

	displayedColumns: Columns[];
	dataSource: CustomDataSource<CompletedQuiz>;
	actions: Action<CompletedQuiz>[];

	constructor(
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) {
		this.displayedColumns = [Columns.ID, Columns.COMPLETED_AT, Columns.ACTIONS];
		this.dataSource = new CustomDataSource<CompletedQuiz>(request => quizzesService.getCompleted(request));
		this.actions = [
			{
				title: 'Show',
				execute: quiz => this.show(quiz)
			}
		];
	}

	ngOnInit(): void { }

	private show(quiz: CompletedQuiz) {

		this.quizzesService.getById(quiz.id).subscribe(
			quiz => {
				this.dialog.open(QuizDialogComponent, { data: quiz });
			}
		)
	}
}
