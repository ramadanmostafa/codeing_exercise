import React, { Component } from "react";
import { connect } from 'react-redux';
import { getQuestionsListing } from './../../store/actions/index'

import QuestionsTable from './../../components/QuestionsTable/QuestionsTable'


class QuestionsListing extends Component {
  
  componentDidMount() {
    this.props.getQuestionsListing();
  }
  
  addNewQuestionHandler = () => {
    this.props.history.push(this.props.match.url + 'questions/add/');
  };
  
  render() {
    let table = <QuestionsTable data={this.props.data}/>;
    if (!this.props.loaded){
      table = <p>{this.props.placeholder}</p>
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

const mapStateToProps = state => {
  return {
    data: state.listing.data,
    loaded: state.listing.loaded,
    placeholder: state.listing.placeholder
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestionsListing: () => dispatch(getQuestionsListing()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionsListing);