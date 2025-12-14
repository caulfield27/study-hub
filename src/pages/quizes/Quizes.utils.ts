import type { IQuiz, IQuizResponse } from "@/shared/types/types";

export function getQuizes(quizes: IQuizResponse[]): IQuiz[] {
  const seen = new Map<string, number>();
  const validQuizes: IQuiz[] = [];
  for (let i = 0; i < quizes.length; i++) {
    const quiz = quizes[i];
    const quizIndex = seen.get(quiz.name);
    if (quizIndex !== undefined) {
      const foundQuiz = validQuizes[quizIndex];
      foundQuiz.quizes.push({
        complexity: quiz.complexity,
        quiz,
      });
    } else {
      validQuizes.push({
        name: quiz.name,
        quizes: [
          {
            complexity: quiz.complexity,
            quiz,
          },
        ],
      });
      seen.set(quiz.name, validQuizes.length - 1);
    }
  }

  return validQuizes;
}
