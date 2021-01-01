import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-quizzes',
	templateUrl: './quizzes.component.html',
	styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {

	links: Link[] = [
		{ title: 'Create Quiz', url: 'create' },
		{ title: 'All Quizzes', url: 'all' },
		{ title: 'Completed Quizzes', url: 'completed' },
		{ title: 'My Quizzes', url: 'my' }
	];

	constructor() { }

	ngOnInit(): void {
	}

}

class Link {
	url: string;
	title: string;
}
