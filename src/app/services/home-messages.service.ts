import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HomeMessagesService {

	private messages: Observable<Message[]>;

	constructor() {

		const WebQuizMessage: Message = {
			title: 'Web Quiz is Offline',
			date: new Date("2020-12-21"),
			text: [
				'Hello, there!',
				'Web Quiz is under construction right now. It will be available soon!',
				'Keep waiting!'
			]
		};
		const LoginRegistrationMessage: Message = {
			title: 'Login & Registration',
			date: new Date("2020-12-30"),
			text: [
				'Hi!',
				'Login and Registration forms are now available!',
				'Next station: Quiz Creation!'
			]
		};

		this.messages = of<Message[]>([LoginRegistrationMessage, WebQuizMessage]);
	}

	public getMessages(): Observable<Message[]> {
		return this.messages;
	}
}

export interface Message {
	title: string;
	date: Date,
	text: string[];
}
