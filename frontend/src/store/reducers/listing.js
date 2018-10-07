import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility'


const initialState = {
  data: [],
  loaded: false,
  placeholder: "Loading..."
};

const reducer = (state=initialState, action) => {
  switch (action.type){
    case actionTypes.GET_QUESTIONS_LISTING_SUCCESS:
      return updateObject(state, {data: action.data, loaded: action.loaded});
      
    case actionTypes.GET_QUESTIONS_LISTING_FAIL:
      return updateObject(state, action);
  }
  return state;
};

export default reducer;