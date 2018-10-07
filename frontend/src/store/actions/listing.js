import * as actionTypes from './actionTypes';
import axios from "axios";


const getQuestionsListingSuccess = ({ data, loaded}) => {
  return {
    type: actionTypes.GET_QUESTIONS_LISTING_SUCCESS,
    data: data,
    loaded: loaded
  };
};


export const getQuestionsListingFail = (error) => {
  return {
    type: actionTypes.GET_QUESTIONS_LISTING_FAIL,
    placeholder: error
  };
};


export const getQuestionsListing = () => {
  return (dispatch, getState) => {
    
    axios.get(window.page.urls.questions).then((response) => {
      dispatch(getQuestionsListingSuccess({data: response.data, loaded: true}));
      
    }).catch(error => {
      dispatch(getQuestionsListingFail(error));
    });
  }
};


export const deleteQuestion = (questionId) => {
  return (dispatch, getState) => {
    
    axios.delete("/api/v1/questions/" + questionId).then(response => {
      let data = [...getState().listing.data];
      data = data.filter(q => q.id !== questionId);
      dispatch(getQuestionsListingSuccess({data: data, loaded: true}));
    }).catch(error => {
      dispatch(getQuestionsListingFail(error));
    });
  }
};