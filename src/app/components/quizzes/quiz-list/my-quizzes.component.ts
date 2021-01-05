import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
		private dialog: MatDialog,
		private router: Router
	) {
		this.displayedColumns = [Columns.TITLE, Columns.TEXT, Columns.ACTIONS];
		this.dataSource = new CustomDataSource<Quiz>(request => this.service.getMyQuizzes(request));
		this.actions = [
			{
				icon: 'search',
				execute: quiz => this.dialog.open(QuizDialogComponent, { data: quiz })
			},
			{
				icon: 'create',
				execute: quiz => this.editQuiz(quiz)
			},
			{
				icon: 'delete',
				execute: quiz => this.deleteQuiz(quiz)
			}
		];
	}

	ngOnInit(): void { }

	private editQuiz(quiz: Quiz) {
		this.router.navigate(['quizzes/create'], { state: { data: quiz } });
	}

	private deleteQuiz(quiz: Quiz) {
		const refresh = () => this.dataSource.loadData();
		this.service.deleteQuiz(quiz)
			.subscribe(refresh);
	}

}
