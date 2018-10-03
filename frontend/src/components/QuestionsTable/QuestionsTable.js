import React from "react";
import PropTypes from "prop-types";
import QuestionsTableRow from './QuestionsTableRow/QuestionsTableRow'


const QuestionsTable = ({ data }) =>
  !data.length ? (
    <p>Nothing to show</p>
  ) : (
    <div className="column">
      <h2 className="subtitle">Showing <strong>{data.length} items</strong></h2>
      
      <table className="table is-striped">
        <thead>
          <tr>
            <th>id</th><th>published</th><th>title</th><th>type</th><th>body</th>
          </tr>
        </thead>
        <tbody>
          {data.map(row => (
            <QuestionsTableRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
QuestionsTable.propTypes = {
  data: PropTypes.array.isRequired
};
export default QuestionsTable;