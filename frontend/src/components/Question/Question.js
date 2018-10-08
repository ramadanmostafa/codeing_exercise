import React from 'react';
import { connect } from 'react-redux';

import TextArea from './../../UI/TextArea/TextArea';
import Answer from './Answer/Answer';


const question = (props) => {
  let answers = [];
  props.data.answers.map((answer, index) => {
    answers.push(
      <Answer
        data={answer}
        key={answer.id}
        upEnabled={index !== 0}
        downEnabled={index !== props.data.answers.length - 1}
      />
    )
  });
  return (
    <div style={{width: "1000px"}}>
      <div className='row'>
        <div className='form-group col-md-2'>
          <button className="form-control btn btn-danger" onClick={props.discard}>Discard</button>
        </div>
        <div className='col-md-6'/>
        <div className='form-group col-md-2'>
          <button className="form-control btn btn-success" onClick={props.saveDraft}>Save Draft</button>
        </div>
        <div className='form-group col-md-2'>
          <button className="form-control btn btn-info" onClick={props.publish}>Publish</button>
        </div>
      </div>
      
      <TextArea
        className='col-md-8'
        title="Question"
        onChange={props.questionBodyChange}
        value={props.data.body ? props.data.body : ""}
      />
      
      <h2>Answers</h2>
      
      {answers}
      
      <div className='form-group' style={{width: '15%'}}>
        <button className="form-control btn btn-success" onClick={props.addAnswer}>Add Answer</button>
      </div>
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    // getQuestionsListing: () => dispatch(getQuestionsListing()),
  }
};

export default connect(null, mapDispatchToProps)(question);