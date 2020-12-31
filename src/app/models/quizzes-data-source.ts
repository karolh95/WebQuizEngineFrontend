import { QuizzesService } from "@services/quizzes.service";
import { CustomDataSource } from "./custom-data-source";
import { Quiz } from "./quiz";

export class QuizzesDataSource extends CustomDataSource<Quiz>{

	constructor(private quizzesService: QuizzesService) {
		super(request => this.quizzesService.get(request));
	}
}