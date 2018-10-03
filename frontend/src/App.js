import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import QuestionsListing from "./containers/QuestionsListing/QuestionsListing";
import QuestionDetails from "./containers/QuestionDetails/QuestionDetails";


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/questions/add' component={QuestionDetails} />
      <Route path='/questions' component={QuestionsListing} />
      <Route path='/' component={QuestionsListing} />
    </Switch>
  </BrowserRouter>
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;