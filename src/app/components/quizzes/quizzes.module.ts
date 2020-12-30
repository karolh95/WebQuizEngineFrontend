import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizzesComponent } from './quizzes.component';
import { QuizzesRoutingModule } from './quizzes-routing.module';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HomeQuizComponent } from './home-quiz/home-quiz.component'
import { CreateQuizComponent } from './create-quiz/create-quiz.component';

@NgModule({
	declarations: [
		QuizzesComponent,
		HomeQuizComponent,
		CreateQuizComponent
	],
	imports: [
		CommonModule,
		QuizzesRoutingModule,
		MatCardModule,
		MatSidenavModule,
		MatListModule
	]
})
export class QuizzesModule { }
