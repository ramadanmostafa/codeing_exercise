import React from 'react';

import TextArea from './../../../UI/TextArea/TextArea';


const answer = (props) => {
  return (
    <div>
      <div style={{display: 'flex', 'flexFlow': 'row', width: '100%'}} className='row'>
        <div className='col-md-2'><h3>({props.data.rank})</h3></div>
        <div className='col-md-4'>
          <label htmlFor="radio1"><strong>Mark as Correct</strong></label>&nbsp;&nbsp;
          <input id="radio1" type="radio" checked={props.data.is_correct} onChange={() => props.makeCorrect(props.data.id)}/>
        </div>
        <div className='col-md-2 form-group'>
          <button className="form-control btn btn-info" disabled={!props.upEnabled} onClick={() => props.moveUp(props.data.id)}>Move Up</button>
        </div>
        <div className='col-md-2 form-group'>
          <button className="form-control btn btn-info" disabled={!props.downEnabled} onClick={() => props.moveDown(props.data.id)}>Move Down</button>
        </div>
        <div className='col-md-2 form-group'>
          <button className="form-control btn btn-danger" onClick={() => props.delete(props.data.id)}>Delete</button>
        </div>
      </div>
      <TextArea
        title="Answer"
        onChange={(value) => props.bodyChanged(value, props.data.id)}
        value={props.data.body ? props.data.body : ""}
      />
      <TextArea
        title="FeedBack"
        onChange={(value) => props.feedbackChanged(value, props.data.id)}
        value={props.data.feedback ? props.data.feedback : ""}
      />
    </div>
  )
};

export default answer;