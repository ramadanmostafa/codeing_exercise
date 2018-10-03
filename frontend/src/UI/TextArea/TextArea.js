import React from 'react';


const textArea = (props) => (
  <div>
    <h2>{props.title}</h2>
    <textarea name="feedback1" cols="110" rows="2">{props.value}</textarea><br/>
  </div>
);

export default textArea;