import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDataSource } from '@models/custom-data-source';
import { Quiz } from '@models/quiz';
import { QuizzesDataSource } from '@models/quizzes-data-source';
import { QuizzesService } from '@services/quizzes.service';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Action } from './quiz-list.component';

@Component({
	selector: 'app-all-quizzes',
	templateUrl: './template.html'
})
export class AllQuizzesComponent implements OnInit {

	displayedColumns: string[];
	dataSource: CustomDataSource<Quiz>;
	actions: Action<Quiz>[];

	constructor(
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) {
		this.displayedColumns = ['id', 'title', 'text', 'actions'];
		this.dataSource = new QuizzesDataSource(this.quizzesService);
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
