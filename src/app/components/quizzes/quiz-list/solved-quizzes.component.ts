import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CustomDataSource } from '@models/custom-data-source';
import { SolvedQuizzesDataSource } from '@models/solved-quizzes-data-source';
import { CompletedQuiz, QuizzesService } from '@services/quizzes.service';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';
import { Action } from './quiz-list.component';

@Component({
	selector: 'app-solved-quizzes',
	templateUrl: './template.html'
})
export class SolvedQuizzesComponent implements OnInit {

	displayedColumns: string[];
	dataSource: CustomDataSource<CompletedQuiz>;
	actions: Action<CompletedQuiz>[];

	constructor(
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) {
		this.displayedColumns = ['id', 'completedAt', 'actions'];
		this.dataSource = new SolvedQuizzesDataSource(this.quizzesService);
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
