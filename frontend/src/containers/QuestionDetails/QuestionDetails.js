import React, { Component } from "react";
import axios from 'axios';

import TextArea from './../../UI/TextArea/TextArea'


class QuestionDetails extends Component {
  state = {
    question: {
      body: '',
      answers: [
        {index: '', isCorrect: false, body: '', feedback: ''},
        {index: '', isCorrect: false, body: '', feedback: ''},
        {index: '', isCorrect: false, body: '', feedback: ''},
      ]
    }
  };
  
  componentDidMount() {
  
  }
  
  render() {
    
    return (
      <div>
        <TextArea title="Question" />
        <h2>Answers</h2>
        <div style={{display: 'flex', 'flexFlow': 'row', width: '100%'}} className='row'>
          <div className='col-md-2'><h3>(A)</h3></div>
          <div className='col-md-4'>
            <label  htmlFor="radio1"><strong>Mark as Correct</strong></label>&nbsp;&nbsp;
            <input id="radio1" type="radio"/>
          </div>
          <div className='col-md-2 form-group'>
            <button className="form-control btn btn-info">Move Up</button>
          </div>
          <div className='col-md-2 form-group'>
            <button className="form-control btn btn-info">Move Down</button>
          </div>
          <div className='col-md-2 form-group'>
            <button className="form-control btn btn-danger">Delete</button>
          </div>
        </div>
        <TextArea title="Answer" />
        <TextArea title="FeedBack" />
        <div className='form-group' style={{width: '15%'}}>
          <button className="form-control btn btn-success">Add Answer</button>
        </div>
      </div>
    );
  }
}
export default QuestionDetails;