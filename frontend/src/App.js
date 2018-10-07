import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import listingReducer from './store/reducers/listing';
import detailsReducer from './store/reducers/details';
import QuestionsListing from "./containers/QuestionsListing/QuestionsListing";
import QuestionDetails from "./containers/QuestionDetails/QuestionDetails";

const rootReducer = combineReducers({listing: listingReducer, details: detailsReducer});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/questions/details/:id' component={QuestionDetails} />
      <Route path='/questions/add' component={QuestionDetails} />
      <Route path='/questions' component={QuestionsListing} />
      <Route path='/' component={QuestionsListing} />
    </Switch>
  </BrowserRouter>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<Provider store={store}><App /></Provider>, wrapper) : null;