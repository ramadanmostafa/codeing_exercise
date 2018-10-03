import React, { Component } from "react";
import axios from 'axios';

import QuestionsTable from './../../components/QuestionsTable/QuestionsTable'


class QuestionsListing extends Component {
  state = {
      data: [],
      loaded: false,
      placeholder: "Loading..."
    };
  
  componentDidMount() {
    axios.get(window.page.urls.questions).then((response) => {
      this.setState({ data: response.data, loaded: true })
    }).catch(error => {
      this.setState({ placeholder: "Something went wrong" })
    });
  }
  
  addNewQuestionHandler = () => {
    console.log(this.props)
    this.props.history.push(this.props.match.url + 'questions/add/')
  };
  
  render() {
    let table = <QuestionsTable data={this.state.data} />;
    if (!this.state.loaded){
      table = <p>{this.state.placeholder}</p>
    }
    return (
      <div>
        <button onClick={this.addNewQuestionHandler}>Add New Question</button>
        {table}
      </div>
    );
  }
}
export default QuestionsListing;