import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-quizzes',
	templateUrl: './quizzes.component.html',
	styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

	links: Link[] = [
		{ title: 'Create Quiz', url: 'create', icon: 'add' },
		{ title: 'All Quizzes', url: 'all', icon: 'list' },
		{ title: 'Completed Quizzes', url: 'completed', icon: 'done' },
		{ title: 'My Quizzes', url: 'my', icon: 'dashboard' }
	];

	constructor() { }

	ngOnInit(): void { }

}

interface Link {
	url: string;
	title: string;
	icon: string;
}
