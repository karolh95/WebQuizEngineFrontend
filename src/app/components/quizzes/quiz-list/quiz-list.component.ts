import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { CustomDataSource } from '@models/custom-data-source';
import { tap } from 'rxjs/operators';

@Component({
	selector: 'app-quiz-list',
	templateUrl: './quiz-list.component.html',
	styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit, AfterViewInit {

	@Input() displayedColumns: Columns[];
	@Input() dataSource: CustomDataSource<any>;
	@Input() actions: Action<any>[];
	@ViewChild(MatPaginator) paginator: MatPaginator;

	columns = Columns;

	constructor() { }

	ngOnInit(): void {
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
}

export interface Action<T> {
	title: string;
	execute: (item: T) => void;
}

export enum Columns {
	ID = 'id',
	TITLE = 'title',
	TEXT = 'text',
	COMPLETED_AT = 'completedAt',
	ACTIONS = 'actions'
}
