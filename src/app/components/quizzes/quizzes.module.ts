import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesComponent } from './quizzes.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeQuizComponent } from './home-quiz/home-quiz.component'
import { CreateQuizComponent } from './create-quiz/create-quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { DialogComponent } from './create-quiz/dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { QuizDialogComponent } from './quiz-dialog/quiz-dialog.component';
import { SolvedQuizzesComponent } from './quiz-list/solved-quizzes.component';
import { AllQuizzesComponent } from './quiz-list/all-quizzes.component';
import { QuizListComponent } from './quiz-list/quiz-list.component';

@NgModule({
	declarations: [
		QuizzesComponent,
		HomeQuizComponent,
		CreateQuizComponent,
		DialogComponent,
		AllQuizzesComponent,
		QuizDialogComponent,
		SolvedQuizzesComponent,
		QuizListComponent
	],
	imports: [
		CommonModule,
		QuizzesRoutingModule,
		MatCardModule,
		MatSidenavModule,
		MatListModule,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTableModule,
		MatDialogModule,
		MatPaginatorModule
	]
})
export class QuizzesModule { }
