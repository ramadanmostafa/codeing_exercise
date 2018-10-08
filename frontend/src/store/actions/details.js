import * as actionTypes from './actionTypes';
import axios from "axios";


const getQuestionDetailsSuccess = ({ data, loaded}) => {
  return {
    type: actionTypes.GET_QUESTION_DETAILS_SUCCESS,
    data: data,
    loaded: loaded
  };
};


export const getQuestionDetailsFail = (error) => {
  return {
    type: actionTypes.GET_QUESTION_DETAILS_FAIL,
    placeholder: error
  };
};


export const getQuestionDetails = (questionId) => {
  return (dispatch, getState) => {
    
    axios.get("/api/v1/questions/" + questionId).then((response) => {
      dispatch(getQuestionDetailsSuccess({data: response.data, loaded: true}));
      
    }).catch(error => {
      dispatch(getQuestionDetailsFail(error));
    });
  }
};

export const resetState = () => {
  return { type: actionTypes.RESET_STATE };
};

export const answerBodyChanged = (val, answerId) => {
  return { type: actionTypes.ANSWER_BODY_CHANGED, id: answerId, val: val };
};

export const answerFeedbackChanged = (val, answerId) => {
  return { type: actionTypes.ANSWER_FEEDBACK_CHANGED, id: answerId, val: val };
};

export const answerDelete = (answerId) => {
  return { type: actionTypes.ANSWER_DELETE, id: answerId };
};

export const answerMakeCorrect = (answerId) => {
  return { type: actionTypes.ANSWER_MAKE_CORRECT, id: answerId };
};

export const answerMoveUp = (answerId) => {
  return { type: actionTypes.ANSWER_MOVE_UP, id: answerId };
};

export const answerMoveDown = (answerId) => {
  return { type: actionTypes.ANSWER_MOVE_DOWN, id: answerId };
};
