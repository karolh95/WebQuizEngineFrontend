import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Quiz } from '@models/quiz';

@Component({
	selector: 'app-dialog',
	templateUrl: './dialog.component.html',
	styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

	constructor(
		@Inject(MAT_DIALOG_DATA) public quiz: Quiz) { }

	ngOnInit(): void {
	}

}
