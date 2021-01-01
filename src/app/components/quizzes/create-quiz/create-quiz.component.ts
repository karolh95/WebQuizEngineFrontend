import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { QuizzesService, Quiz } from '@services/quizzes.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
	selector: 'app-create-quiz',
	templateUrl: './create-quiz.component.html',
	styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

	displayedColumns: string[] = ['text', 'isCorrect', 'removeButton'];
	options: Option[];
	dataSource: MatTableDataSource<Option>;
	formGroup: FormGroup;
	errors: { defaultMessage: string }[];

	constructor(
		private builder: FormBuilder,
		private quizzesService: QuizzesService,
		private dialog: MatDialog
	) { }

	ngOnInit(): void {

		this.formGroup = this.builder.group({
			title: [''],
			text: [''],
		});
		this.options = [];
		this.dataSource = new MatTableDataSource<Option>(this.options);
	}

	onSubmit() {

		this.errors = [];
		const quiz: Quiz = {
			title: this.formGroup.controls.title.value,
			text: this.formGroup.controls.text.value,
			options: [],
			answer: []
		};
		for (let i = 0; i < this.options.length; i++) {
			let option = this.options[i];
			quiz.options.push(option.text);
			if (option.isCorrect) {
				quiz.answer.push(i);
			}
		}

		const next = (quiz: Quiz) => {
			this.dialog.open(DialogComponent, { data: quiz })
			this.ngOnInit();
		};
		const error = (e: HttpErrorResponse) => {
			this.errors = e.error.errors;
		}
		this.quizzesService
			.save(quiz)
			.subscribe(next, error);
	}

	addOption() {
		this.options.push(new Option());
		this.refresh();
	}

	remove(option: Option) {
		this.options = this.options.filter(o => o != option);
		this.refresh();
	}

	refresh() {
		this.dataSource.data = this.options;
	}
}

class Option {
	text: string;
	isCorrect: boolean;

	constructor() {
		this.text = '';
		this.isCorrect = false;
	}

	change($event) {
		this.isCorrect = $event.checked;
	}
}
