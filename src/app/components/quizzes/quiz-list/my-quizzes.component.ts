import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDataSource } from '@models/custom-data-source';
import { QuizzesService, Quiz } from '@services/quizzes.service';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Action, Columns } from './quiz-list.component';

@Component({
	selector: 'app-my-quizzes',
	templateUrl: './template.html'
})
export class MyQuizzesComponent implements OnInit {

	displayedColumns: Columns[];
	dataSource: CustomDataSource<Quiz>;
	actions: Action<Quiz>[];

	constructor(
		private service: QuizzesService,
		private dialog: MatDialog
	) {
		this.displayedColumns = [Columns.ID, Columns.TITLE, Columns.TEXT, Columns.ACTIONS];
		this.dataSource = new CustomDataSource<Quiz>(request => this.service.getMyQuizzes(request));
		this.actions = [
			{
				title: 'Show',
				execute: quiz => this.dialog.open(QuizDialogComponent, { data: quiz })
			},
			{
				title: 'Remove',
				execute: quiz => this.deleteQuiz(quiz)
			}
		];
	}

	ngOnInit(): void { }

	private deleteQuiz(quiz: Quiz) {
		const refresh = () => this.dataSource.loadData();
		this.service.deleteQuiz(quiz)
			.subscribe(refresh);
	}

}