import * as actionTypes from '../actions/actionTypes'
import { updateObject, updateAnswersRank } from "../utility";


const initialState = {
  loaded: false,
  placeholder: "Loading...",
  question: {
    answers: []
  }
};

const reducer = (state=initialState, action) => {
  // deep copy
  let question = JSON.parse(JSON.stringify(state.question));
  let answer;
  switch (action.type){
    case actionTypes.GET_QUESTION_DETAILS_SUCCESS:
      return updateObject(state, {question: action.data, loaded: action.loaded});
      
    case actionTypes.GET_QUESTION_DETAILS_FAIL:
      return updateObject(state, action);
      
    case actionTypes.RESET_STATE:
      return updateObject(state, initialState);
      
    case actionTypes.ADD_NEW_ANSWER:
      const rank = question.answers.length + 1;
      const addAnswer = {id: Math.random() * 10000000000, body: '', feedback: '', rank: rank, is_correct: false};
      if (question.hasOwnProperty('answers')){
        question.answers.push(addAnswer);
      } else {
        question.answers = [addAnswer];
      }
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_BODY_CHANGED:
      answer = question.answers.find((answer) => answer.id === action.id );
      answer.body = action.val.toString('html');
      return updateObject(state, {question: question});
      
    case actionTypes.QUESTION_BODY_CHANGED:
      question.body = action.val.toString('html');
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_FEEDBACK_CHANGED:
      answer = question.answers.find((answer) => answer.id === action.id );
      answer.feedback = action.val.toString('html');
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_DELETE:
      question.answers = question.answers.filter(answer => answer.id !== action.id);
      question = updateAnswersRank(question);
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_MAKE_CORRECT:
      question.answers.map(answer => {
        answer.is_correct = answer.id === action.id;
      });
      return updateObject(state, {question: question});
      
    case actionTypes.PUBLISH_QUESTION:
      question.published = true;
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_MOVE_UP:
      for (let index=0; index<question.answers.length; index++) {
        if (question.answers[index].id === action.id) {
          const tmp = {...question.answers[index]};
          question.answers[index] = {...question.answers[index - 1]};
          question.answers[index - 1] = tmp;
          break
        }
      }
      question = updateAnswersRank(question);
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_MOVE_DOWN:
    
      for (let index=0; index<question.answers.length; index++) {
        if (question.answers[index].id === action.id) {
          const tmp = {...question.answers[index]};
          question.answers[index] = {...question.answers[index + 1]};
          question.answers[index + 1] = tmp;
          break
        }
      }
      question = updateAnswersRank(question);
      return updateObject(state, {question: question});
  }
  return state;
};

export default reducer;