import React from "react";
import PropTypes from "prop-types";
import QuestionsTableRow from './QuestionsTableRow/QuestionsTableRow'


const QuestionsTable = (props) =>
  !props.data.length ? (
    <p>Nothing to show</p>
  ) : (
    <div className="column">
      <h2 className="subtitle">Showing <strong>{props.data.length} items</strong></h2>
      
      <table className="table is-striped">
        <thead>
          <tr>
            <th>id</th><th>published</th><th>body</th><th>type</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map(row => (
            <QuestionsTableRow key={row.id} row={row} deleteQuestion={props.deleteQuestion} />
          ))}
        </tbody>
      </table>
    </div>
  );
QuestionsTable.propTypes = {
  data: PropTypes.array.isRequired
};
export default QuestionsTable;