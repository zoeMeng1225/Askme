import { shuffleArray } from './utils';

//type for each question
export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
} 

export type QuestionsState = Question & { answers : string[]}


export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log('data is', data)
  return data.results.map((question: Question) => (
    {
      ...question, 
      answers: shuffleArray([...question.incorrect_answers, question.correct_answer]) 
    }
  ))
}