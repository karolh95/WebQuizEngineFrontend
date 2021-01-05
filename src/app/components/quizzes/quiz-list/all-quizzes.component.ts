import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDataSource } from '@models/custom-data-source';
import { QuizzesService, Quiz } from '@services/quizzes.service';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Action, Columns } from './quiz-list.component';

@Component({
	selector: 'app-all-quizzes',
	templateUrl: './template.html'
})
export class AllQuizzesComponent implements OnInit {

	displayedColumns: Columns[];
	dataSource: CustomDataSource<Quiz>;
	actions: Action<Quiz>[];

	constructor(
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) {
		this.displayedColumns = [Columns.TITLE, Columns.TEXT, Columns.ACTIONS];
		this.dataSource = new CustomDataSource<Quiz>(request => this.quizzesService.getQuizzes(request));
		this.actions = [
			{
				title: 'Show',
				execute: quiz => this.show(quiz)
			}
		];
	}

	ngOnInit(): void { }

	private show(quiz: Quiz) {
		this.dialog.open(QuizDialogComponent, { data: quiz });
	}
}
