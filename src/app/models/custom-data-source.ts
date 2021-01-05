import { CollectionViewer } from "@angular/cdk/collections";
import { DataSource } from "@angular/cdk/table";
import { Page } from "@services/quizzes.service";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, finalize } from "rxjs/operators";

export class CustomDataSource<T> implements DataSource<T> {

	private data = new BehaviorSubject<T[]>([]);
	private loadingData = new BehaviorSubject<boolean>(false);
	private count = new BehaviorSubject<number>(0);
	public counter = this.count.asObservable();
	public isLoadingData = this.loadingData.asObservable();

	constructor(private dataObserver: ((request) => Observable<Page<T>>)) { }

	empty() {
		return this.data.value.length == 0;
	}

	connect(collectionViewer: CollectionViewer): Observable<T[] | readonly T[]> {
		return this.data.asObservable();
	}
	disconnect(collectionViewer: CollectionViewer): void {
		this.data.complete();
		this.loadingData.complete();
		this.count.complete();
	}

	loadData(pageNumber: number = 0) {

		const request = { page: pageNumber };
		this.loadingData.next(true);
		this.dataObserver(request)
			.pipe(
				catchError(() => of([])),
				finalize(() => this.loadingData.next(false))
			)
			.subscribe(
				(result: Page<T>) => {
					this.data.next(result.content);
					this.count.next(result.totalElements);
				}
			);
	}
}
