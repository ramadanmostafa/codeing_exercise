import React from "react";
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteQuestion } from './../../../store/actions/index'


const QuestionsTableRow = (props) => {
    const published = props.row.published ? "Yes" : "No";
    return (
        <tr>
            <td>{props.row.id}</td>
            <td>{published}</td>
            <td>
              <Link to={"/questions/details/" + props.row.id}>{props.row.body.slice(0, 50)}</Link>
            </td>
            <td>{props.row.type}</td>
            <td>
              <Link to={"/questions/details/" + props.row.id}>Edit</Link>
            </td>
            <td>
              <div className='form-group'>
                <button className="form-control btn btn-danger" onClick={() => props.deleteQuestion(props.row.id)}>Delete</button>
              </div>
            </td>
        </tr>
    )
};

const mapDispatchToProps = dispatch => {
  return {
    deleteQuestion: (id) => dispatch(deleteQuestion(id))
  }
};

export default connect(null, mapDispatchToProps)(QuestionsTableRow);