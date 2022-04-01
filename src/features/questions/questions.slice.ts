import {AnyAction} from '@reduxjs/toolkit';
import {Movie, QuestionT} from 'types';

export const GENERATE_QUESTIONS = 'questions/generateQuestions';

export const generateQuestions = (movies: Movie[]) => ({
  type: GENERATE_QUESTIONS,
  payload: movies,
});

function generateQuestionsFromMovies(movies: Movie[]) {
  const questionsCache = localStorage.getItem('question');
  const questionsCacheParsed = questionsCache ? JSON.parse(questionsCache) : null;
  let response;
  let json;
  if (questionsCacheParsed) {
    return questionsCacheParsed;
  }
  const questions: Array<QuestionT> = [];
  movies.forEach((movie, index) => {
    let crewString = '';
    let answer: boolean;
    // if pair index answser is true
    if (index % 2 === 0) {
      crewString = movie.crew.replace(' (dir.)', ', ');
      answer = true;
    }
    // else answer is false - quick and dirty solution
    else {
      crewString = movies[index + 1]
        ? movies[index + 1].crew.replace(' (dir.)', ', ')
        : movies[index - 1].crew.replace(' (dir.)', ', ');
      answer = false;
    }
    const crewArrayRaw = crewString.split(', ');
    const crewArray = crewArrayRaw.filter(Boolean);
    const randomIndex = Math.floor(Math.random() * crewArray.length);
    const question = `Did ${crewArray[randomIndex]} directed or played in ${movie.fullTitle}?`;
    questions.push({question, answer});
  });
  localStorage.setItem('questions', JSON.stringify(questions));
  return questions;
}

export default function questionsReducer(state = [], action: AnyAction) {
  if (action.type === GENERATE_QUESTIONS) {
    const questions = generateQuestionsFromMovies(action.payload);
    return questions.sort(() => Math.random() - Math.random());
  }
  return state;
}
