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
  
  deleteQuestionHandler = (questionId) => {
    axios.delete("/api/v1/questions/" + questionId).then((response) => {
      let data = [...this.state.data];
      data = data.filter(q => q.id !== questionId);
      this.setState({data});
    }).catch(error => {
      this.setState({ placeholder: "Something went wrong" })
    });
  };
  
  addNewQuestionHandler = () => {
    this.props.history.push(this.props.match.url + 'questions/add/');
  };
  
  render() {
    let table = <QuestionsTable data={this.state.data} deleteQuestion={this.deleteQuestionHandler}/>;
    if (!this.state.loaded){
      table = <p>{this.state.placeholder}</p>
    }
    return (
      <div>
        <div className='form-group' style={{width: '100%'}}>
          <button style={{width: 'auto'}} className="form-control btn btn-success" onClick={this.addNewQuestionHandler}>Add New Question</button>
        </div>
        {table}
      </div>
    );
  }
}
export default QuestionsListing;