import { QuizzesService, CompletedQuiz } from "@services/quizzes.service";
import { CustomDataSource } from "./custom-data-source";

export class SolvedQuizzesDataSource extends CustomDataSource<CompletedQuiz> {

	constructor(private service: QuizzesService) {
		super(request => service.getCompleted(request));
	}
}
