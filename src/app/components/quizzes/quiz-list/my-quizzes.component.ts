import { Component, OnInit } from '@angular/core';
import { CustomDataSource } from '@models/custom-data-source';
import { QuizzesService, Quiz } from '@services/quizzes.service';
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
		private service: QuizzesService
	) {
		this.displayedColumns = [Columns.ID, Columns.TITLE, Columns.TEXT];
		this.dataSource = new CustomDataSource<Quiz>(request => this.service.getMy(request));
	}

	ngOnInit(): void { }

}
