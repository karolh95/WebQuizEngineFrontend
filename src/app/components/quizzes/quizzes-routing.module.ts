import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeQuizComponent } from "./home-quiz/home-quiz.component";
import { QuizzesComponent } from "./quizzes.component";

const routes: Routes = [
	{
		path: '', component: QuizzesComponent,
		children: [
			{ path: '', component: HomeQuizComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class QuizzesRoutingModule { }