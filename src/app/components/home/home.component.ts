import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	messages: Message[];

	constructor() { }

	ngOnInit(): void {

		this.messages = [
			{
				title: 'Login & Registration',
				date: new Date("2020-12-30"),
				text: [
					'Hi!',
					'Login and Registration forms are now available!',
					'Next station: Quiz Creation!'
				]
			},
			{
				title: 'Web Quiz is Offline',
				date: new Date("2020-12-21"),
				text: [
					'Hello, there!',
					'Web Quiz is under construction right now. It will be available soon!',
					'Keep waiting!'
				]
			}
		];
	}

}

interface Message {
	title: string;
	date: Date,
	text: string[];
}