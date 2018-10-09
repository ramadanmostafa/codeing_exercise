import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

import Question from './../../components/Question/Question';
import { getQuestionDetails, resetState, publishQuestion } from './../../store/actions/index'


class QuestionDetails extends Component {
  
  componentDidMount() {
    if (this.props.match.params.hasOwnProperty('id')){
      this.props.getQuestionDetails(this.props.match.params.id);
    }
  }
  
  componentWillUnmount() {
    this.props.resetState();
  }
  
  publishHandler = () => {
    this.props.publishQuestion().then(() => this.saveDraftHandler());
  };
  
  saveDraftHandler = () => {
    if (this.props.match.params.hasOwnProperty('id')){
      axios.put("/api/v1/questions/" + this.props.match.params.id, this.props.question).then((response) => {
        this.props.history.replace('/');
      }).catch(error => {
        this.setState({ placeholder: "Something went wrong" })
      });
    } else {
      axios.post(window.page.urls.questions, this.props.question).then((response) => {
        this.props.history.replace('/');
      }).catch(error => {
        this.setState({ placeholder: "Something went wrong" })
      });
    }
  };
  
  discardHandler = () => {
    this.props.history.replace('/');
  };
  
  render() {
    return (
        <Question
          data={this.props.question}
          discard={this.discardHandler}
          saveDraft={this.saveDraftHandler}
          publish={this.publishHandler}
        />
    );
  }
}

const mapStateToProps = state => {
  return {
    question: state.details.question
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getQuestionDetails: (id) => dispatch(getQuestionDetails(id)),
    resetState: () => dispatch(resetState()),
    publishQuestion: () => dispatch(publishQuestion()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
