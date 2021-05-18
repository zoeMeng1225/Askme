import React, {useState} from 'react';
// import {fetchQuizQuestions} from './API';
import QuestionsCard from './components/QuestionsCard';
import {Difficulty, QuestionsState, fetchQuizQuestions} from './API';

import { GlobalStyle, Wrapper } from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correctAnswer: string;
  correct: boolean;
}


const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameover, setGameover] = useState(true);

  console.log(questions)

  const startTrivia = async () => {
   
      setLoading(true);
      setGameover(false);

      const newQuestion = await fetchQuizQuestions(
        TOTAL_QUESTIONS,
        Difficulty.EASY
      )
      setQuestions(newQuestion);
      setUserAnswers([]);
      setLoading(false);
      setNumber(0);
      setScore(0);
    
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameover){
      const answer = e.currentTarget.value;
      //check if current answer === answer?
      const correct = questions[number].correct_answer === answer;
      if(correct){
        setScore(prev => prev + 1);
      }
      //save answer in the array
      const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer
      } 
      setUserAnswers(prev => [...prev, answerObject])
    }
  }


  const nextQuestion = () => {
    const nextQuestion = number + 1;
    
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameover(true);
    }else{
      setNumber(nextQuestion)
    }
  }


  return (
    <>
      <GlobalStyle/>
      <Wrapper>
      <h1>Quiz app</h1>
      {
          gameover || userAnswers.length === TOTAL_QUESTIONS ? (
          <button className = "start" onClick = {startTrivia}>Start</button>)
          : null
      } 
      {
        !gameover ? <p className = "score">Score: {score}</p> : null
      }
      { loading && <p>Loading Questions...</p>}
      {
        !loading && !gameover && (
          <QuestionsCard
            questionNr = {number + 1}
            totalQuestions = {TOTAL_QUESTIONS}
            question={questions[number].question}
            answers = {questions[number].answers}
            userAnswer = {userAnswers ? userAnswers[number] : undefined}
            callback = {checkAnswer}/>
        )}
      {
        !gameover && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ?      
         (<button className = "next" onClick = {nextQuestion}>Next Question</button>)
         : 
         null
      }     
     </Wrapper>
    </>
  );
}

export default App;
