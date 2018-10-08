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
  let question, answer;
  switch (action.type){
    case actionTypes.GET_QUESTION_DETAILS_SUCCESS:
      return updateObject(state, {question: action.data, loaded: action.loaded});
      
    case actionTypes.GET_QUESTION_DETAILS_FAIL:
      return updateObject(state, action);
      
    case actionTypes.RESET_STATE:
      return updateObject(state, initialState);
      
    case actionTypes.ANSWER_BODY_CHANGED:
      question = {...state.question};
      answer = question.answers.find((answer) => answer.id === action.id );
      answer.body = action.val.toString('html');
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_FEEDBACK_CHANGED:
      question = {...state.question};
      answer = question.answers.find((answer) => answer.id === action.id );
      answer.feedback = action.val.toString('html');
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_DELETE:
      question = {...state.question};
      question.answers = question.answers.filter(answer => answer.id !== action.id);
      question = updateAnswersRank(question);
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_MAKE_CORRECT:
      // deep copy
      question = JSON.parse(JSON.stringify(state.question));
      question.answers.map(answer => {
        answer.is_correct = answer.id === action.id;
      });
      return updateObject(state, {question: question});
      
    case actionTypes.ANSWER_MOVE_UP:
      question = {...state.question};
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
      question = {...state.question};
    
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