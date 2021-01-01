import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateQuizComponent } from "./create-quiz/create-quiz.component";
import { HomeQuizComponent } from "./home-quiz/home-quiz.component";
import { AllQuizzesComponent } from "./quiz-list/all-quizzes.component";
import { QuizzesComponent } from "./quizzes.component";
import { CompletedQuizzesComponent } from "./quiz-list/completed-quizzes.component";
import { MyQuizzesComponent } from "./quiz-list/my-quizzes.component";

const routes: Routes = [
	{
		path: '', component: QuizzesComponent,
		children: [
			{ path: '', component: HomeQuizComponent },
			{ path: 'create', component: CreateQuizComponent },
			{ path: 'all', component: AllQuizzesComponent },
			{ path: 'completed', component: CompletedQuizzesComponent },
			{ path: 'my', component: MyQuizzesComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizzesRoutingModule { }