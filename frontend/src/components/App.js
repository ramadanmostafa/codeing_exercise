import React from "react";
import ReactDOM from "react-dom";
import QuestionsDataProvider from "./QuestionsDataProvider";
import QuestionsTable from "./QuestionsTable";


const App = () => (
  <QuestionsDataProvider
      endpoint={window.page.urls.questions}
      render={data => <QuestionsTable data={data} />} />
);
const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(<App />, wrapper) : null;