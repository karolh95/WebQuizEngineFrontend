import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { QuizzesService, Answer, Quiz } from '@services/quizzes.service';

@Component({
	selector: 'app-quiz-dialog',
	templateUrl: './quiz-dialog.component.html',
	styleUrls: ['./quiz-dialog.component.css']
})
export class QuizDialogComponent implements OnInit {

	userAnswer: boolean[];
	feedback: string;
	disabled: boolean;

	constructor(
		@Inject(MAT_DIALOG_DATA) public quiz: Quiz,
		private quizzesService: QuizzesService
	) {
		this.feedback = '';
		this.disabled = false;
		this.userAnswer = Array(quiz.options.length).fill(false);
	}

	ngOnInit(): void {
	}

	solve() {
		this.disabled = true;
		this.quiz.answer = [];
		for (let i = 0; i < this.quiz.options.length; i++) {
			if (this.userAnswer[i]) {
				this.quiz.answer.push(i);
			}
		}
		this.quizzesService.solveQuiz(this.quiz).subscribe(
			(answer: Answer) => {
				this.feedback = answer.feedback;
				if (!answer.success) {
					this.disabled = false;
				}
			}
		);
	}

}
