import { QuizzesService } from "@services/quizzes.service";
import { CustomDataSource } from "./custom-data-source";
import { Quiz } from "./quiz";

export class MyQuizzesDataSource extends CustomDataSource<Quiz>{

	constructor(private service: QuizzesService) {
		super(request => this.service.getMy(request));
	}
}