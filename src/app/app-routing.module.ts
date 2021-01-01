import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '@components/home/home.component';
import { AuthenticationGuard } from '@guards/authentication.guard';
import { UnauthenticatedGuard } from '@guards/unauthenticated.guard';

const quizzesModule = () => import('@components/quizzes/quizzes.module').then(x => x.QuizzesModule);
const accountModule = () => import('@components/account/account.module').then(x => x.AccountModule);

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'account', loadChildren: accountModule, canActivate: [UnauthenticatedGuard] },
	{ path: 'quizzes', loadChildren: quizzesModule, canActivate: [AuthenticationGuard] },
	{ path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
