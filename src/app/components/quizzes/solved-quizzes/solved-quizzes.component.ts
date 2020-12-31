import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CustomDataSource } from '@models/custom-data-source';
import { Quiz } from '@models/quiz';
import { SolvedQuizzesDataSource } from '@models/solved-quizzes-data-source';
import { CompletedQuiz, QuizzesService } from '@services/quizzes.service';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-solved-quizzes',
	templateUrl: './solved-quizzes.component.html',
	styleUrls: ['./solved-quizzes.component.css']
})
export class SolvedQuizzesComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = ['id', 'completedAt'];
	dataSource: CustomDataSource<CompletedQuiz>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private quizzesService: QuizzesService
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
}
