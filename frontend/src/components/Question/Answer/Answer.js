import React from 'react';

import TextArea from './../../../UI/TextArea/TextArea';
import { connect } from "react-redux";
import {
  answerBodyChanged, answerDelete, answerFeedbackChanged, answerMakeCorrect, answerMoveUp, answerMoveDown
} from './../../../store/actions/index';


const answer = (props) => {
  return (
    <div>
      <div style={{display: 'flex', 'flexFlow': 'row', width: '100%'}} className='row'>
        <div className='col-md-2'><h3>({props.answer.rank})</h3></div>
        <div className='col-md-4'>
          <label htmlFor={'checkbox' + props.id}><strong>{props.answer.is_correct ? "Correct" : "Mark as Correct"}</strong></label>&nbsp;&nbsp;
          <input
            id={'checkbox' + props.id} type="checkbox"
            checked={props.answer.is_correct} onChange={() => props.makeCorrect(props.id)}
          />
        </div>
        <div className='col-md-2 form-group'>
          <button className="form-control btn btn-info" disabled={!props.upEnabled} onClick={() => props.moveUp(props.id)}>Move Up</button>
        </div>
        <div className='col-md-2 form-group'>
          <button className="form-control btn btn-info" disabled={!props.downEnabled} onClick={() => props.moveDown(props.id)}>Move Down</button>
        </div>
        <div className='col-md-2 form-group'>
          <button className="form-control btn btn-danger" onClick={() => props.delete(props.id)}>Delete</button>
        </div>
      </div>
      <TextArea
        title="Answer"
        onChange={(value) => props.bodyChanged(value, props.id)}
        value={props.answer.body ? props.answer.body : ""}
      />
      <TextArea
        title="FeedBack"
        onChange={(value) => props.feedbackChanged(value, props.id)}
        value={props.answer.feedback ? props.answer.feedback : ""}
      />
    </div>
  )
};

const mapDispatchToProps = dispatch => {
  return {
    bodyChanged: (val, answerId) => dispatch(answerBodyChanged(val, answerId)),
    feedbackChanged: (val, answerId) => dispatch(answerFeedbackChanged(val, answerId)),
    delete: (answerId) => dispatch(answerDelete(answerId)),
    makeCorrect: (answerId) => dispatch(answerMakeCorrect(answerId)),
    moveUp: (answerId) => dispatch(answerMoveUp(answerId)),
    moveDown: (answerId) => dispatch(answerMoveDown(answerId)),
  }
};

const mapStateToProps = (state, ownProps) => ({
  answer: state.details.question.answers.find(a => a.id === ownProps.id)
});

export default connect(mapStateToProps, mapDispatchToProps)(answer);