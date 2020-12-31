import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
import { HomeQuizComponent } from "./home-quiz/home-quiz.component";
import { QuizListComponent } from "./quiz-list/quiz-list.component";
import { QuizzesComponent } from "./quizzes.component";
import { SolvedQuizzesComponent } from "./solved-quizzes/solved-quizzes.component";

const routes: Routes = [
	{
		path: '', component: QuizzesComponent,
		children: [
			{ path: '', component: HomeQuizComponent },
			{ path: 'create', component: CreateQuizComponent },
			{ path: 'all', component: QuizListComponent },
			{ path: 'solved', component: SolvedQuizzesComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizzesRoutingModule { }