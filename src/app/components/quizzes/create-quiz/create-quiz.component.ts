import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuizzesService, Quiz } from '@services/quizzes.service';
import { Observable } from 'rxjs';
import { DialogComponent } from './dialog/dialog.component';

@Component({
	selector: 'app-create-quiz',
	templateUrl: './create-quiz.component.html',
	styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {

	private action: (quiz: Quiz) => Observable<Quiz>;

	formGroup: FormGroup;

	quiz: Quiz;
	errors: { defaultMessage: string }[];

	get options(): FormArray {
		return this.formGroup.controls.options as FormArray;
	}

	constructor(
		private builder: FormBuilder,
		private quizzesService: QuizzesService,
		private dialog: MatDialog,
		private router: Router
	) {
		const extras = this.router.getCurrentNavigation().extras;

		if (extras.state) {
			this.quiz = extras.state.data;
			this.action = quiz => quizzesService.updateQuiz(quiz);
		} else {
			this.quiz = { title: '', text: '', options: [''] };
			this.action = quiz => quizzesService.saveQuiz(quiz);
		}
	}

	ngOnInit(): void {
		this.formGroup = this.builder.group({
			title: [this.quiz.title],
			text: [this.quiz.text],
			options: this.builder.array([])
		});
		this.quiz.options.forEach(
			option => this.addOption(option)
		);
	}

	onSubmit() {

		this.errors = [];
		this.quiz.title = this.formGroup.controls.title.value;
		this.quiz.text = this.formGroup.controls.text.value;

		const options: string[] = [];
		const answer: number[] = [];
		this.options.controls.forEach(

			(group: FormGroup, i: number) => {

				options.push(group.controls.text.value);
				if (group.controls.answer.value) {
					answer.push(i);
				}
			}
		);
		this.quiz.options = options;
		this.quiz.answer = answer;

		const next = (quiz: Quiz) => {
			this.dialog.open(DialogComponent, { data: quiz })
			this.action = quiz => this.quizzesService.updateQuiz(quiz);
		};
		const error = (e: HttpErrorResponse) => {
			this.errors = e.error.errors;
		}

		this.action(this.quiz).subscribe(next, error);
	}

	remove(index: number) {
		this.options.removeAt(index);
		if (this.options.length == 0) {
			this.addOption('');
		}
	}

	addOption(text: string = '') {
		this.options.push(
			this.builder.group({
				text: [text],
				answer: false
			})
		);
	}
}
