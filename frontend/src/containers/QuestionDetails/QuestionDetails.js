import React, { Component } from "react";
import axios from 'axios';
import { connect } from 'react-redux';

import Question from './../../components/Question/Question';
import { getQuestionDetails, resetState } from './../../store/actions/index'


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
    const question = {...this.state.question};
    question.published = true;
    this.setState({question}, () => this.saveDraftHandler());
  };
  
  saveDraftHandler = () => {
    if (this.props.match.params.hasOwnProperty('id')){
      axios.put("/api/v1/questions/" + this.props.match.params.id, this.state.question).then((response) => {
        this.props.history.replace('/');
      }).catch(error => {
        console.log(error);
        this.setState({ placeholder: "Something went wrong" })
      });
    } else {
      axios.post(window.page.urls.questions, this.state.question).then((response) => {
        this.props.history.replace('/');
      }).catch(error => {
        console.log(error);
        this.setState({ placeholder: "Something went wrong" })
      });
    }
  };
  
  discardHandler = () => {
    this.props.history.replace('/');
  };
  
  addAnswerHandler = () => {
    const question = {...this.state.question};
    const rank = question.answers.length + 1;
    const addAnswer = {id: Math.random() * 10000000000, body: '', feedback: '', rank: rank, is_correct: false};
    if (question.hasOwnProperty('answers')){
      question.answers.push(addAnswer);
    } else {
      question.answers = [addAnswer];
    }
    
    this.setState({question});
  };
  
  questionBodyChangeHandler = (value) => {
    const question = {...this.state.question};
    question.body = value.toString('html');
    this.setState({question});
  };
  
  render() {
    return (
        <Question
          data={this.props.question}
          addAnswer={this.addAnswerHandler}
          questionBodyChange={this.questionBodyChangeHandler}
          answerBodyChanged={this.answerBodyChangedHandler}
          answerFeedbackChanged={this.answerFeedbackChangedHandler}
          answerMakeCorrect={this.answerMakeCorrectHandler}
          answerDelete={this.answerDeleteHandler}
          answerMoveDown={this.answerMoveDownHandler}
          answerMoveUp={this.answerMoveUpHandler}
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
    resetState: () => dispatch(resetState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
