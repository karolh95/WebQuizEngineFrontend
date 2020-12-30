import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { LoginComponent } from '@components/login/login.component';
import { RegisterComponent } from '@components/register/register.component';
import { UnauthenticatedGuard } from '@guards/unauthenticated.guard';

const quizzesModule = () => import('@components/quizzes/quizzes.module').then(x => x.QuizzesModule);

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'login', component: LoginComponent, canActivate: [UnauthenticatedGuard] },
	{ path: 'register', component: RegisterComponent, canActivate: [UnauthenticatedGuard] },
	{ path: 'quizzes', loadChildren: quizzesModule },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
