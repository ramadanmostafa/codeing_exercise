import React from "react";


const QuestionsTableRow = (props) => {
    const published = props.row.published ? "Yes" : "No";
    return (
        <tr>
            <td>{props.row.id}</td>
            <td>{published}</td>
            <td>
                <a href={'#'}>{props.row.title}</a></td>
            <td>{props.row.type}</td>
            <td>{props.row.body}</td>
        </tr>
    )
};

export default QuestionsTableRow;