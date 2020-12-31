import { Component, OnInit } from '@angular/core';
import { HomeMessagesService, Message } from '@services/home-messages.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	messages: Message[];

	constructor(
		private messagesService: HomeMessagesService
	) { }

	ngOnInit(): void {

		this.messagesService.getMessages()
			.subscribe(messages => this.messages = messages);
	}

}