import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { CustomDataSource } from '@models/custom-data-source';
import { Quiz } from '@models/quiz';
import { QuizzesDataSource } from '@models/quizzes-data-source';
import { QuizzesService } from '@services/quizzes.service';
import { tap } from 'rxjs/operators';
import { QuizDialogComponent } from '../quiz-dialog/quiz-dialog.component';

@Component({
	selector: 'app-quiz-list',
	templateUrl: './quiz-list.component.html',
	styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit, AfterViewInit {

	displayedColumns: string[] = ['id', 'title', 'text', 'action'];
	dataSource: CustomDataSource<Quiz>;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {
		this.dataSource = new QuizzesDataSource(this.quizzesService);
		this.dataSource.loadData();

	}

	ngAfterViewInit() {

		this.dataSource.counter
			.pipe(tap(count => this.paginator.length = count))
			.subscribe();

		this.paginator.page
			.subscribe(() => {
				this.dataSource.loadData(this.paginator.pageIndex);
			});
	}

	show(quiz: Quiz) {
		this.dialog.open(QuizDialogComponent, { data: quiz });
	}
}
