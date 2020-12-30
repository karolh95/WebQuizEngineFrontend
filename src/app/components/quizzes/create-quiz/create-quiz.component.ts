import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Quiz } from '@models/quiz';
import { QuizzesService } from '@services/quizzes.service';

@Component({
	selector: 'app-create-quiz',
	templateUrl: './create-quiz.component.html',
	styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

	displayedColumns: string[] = ['text', 'isCorrect', 'removeButton'];
	options: Option[] = [];
	dataSource = new MatTableDataSource<Option>(this.options);
	formGroup: FormGroup;
	errors: { defaultMessage: string }[];

	constructor(
		private builder: FormBuilder,
		private quizzesService: QuizzesService
	) { }

	ngOnInit(): void {

		this.formGroup = this.builder.group({
			title: [''],
			text: [''],
		});
	}

	onSubmit() {

		this.errors = [];
		const quiz: Quiz = new Quiz();

		quiz.title = this.formGroup.controls.title.value;
		quiz.text = this.formGroup.controls.text.value;
		quiz.options = [];
		quiz.answer = [];

		for (let i = 0; i < this.options.length; i++) {
			let option = this.options[i];
			quiz.options.push(option.text);
			if (option.isCorrect) {
				quiz.answer.push(i);
			}
		}

		const f = (quiz: Quiz) => console.log(quiz);
		const e = (e: HttpErrorResponse) => {
			this.errors = e.error.errors;
		}
		this.quizzesService
			.save(quiz)
			.subscribe(f, e);
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
