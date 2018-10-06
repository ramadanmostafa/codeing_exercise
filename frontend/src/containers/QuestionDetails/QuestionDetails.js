import React, { Component } from "react";
import axios from 'axios';

import Question from './../../components/Question/Question';


class QuestionDetails extends Component {
  state = {
    loaded: false,
    placeholder: "Loading...",
    question: {
      answers: []
    }
  };
  
  componentDidMount() {
    if (this.props.match.params.hasOwnProperty('id')){
      axios.get("/api/v1/questions/" + this.props.match.params.id).then((response) => {
        this.setState({ question: response.data, loaded: true })
      }).catch(error => {
        this.setState({ placeholder: "Something went wrong" })
      });
    } else {
      this.setState({ loaded: true })
    }
    
  }
  
  discardHandler = () => {
    this.setState({
      loaded: false,
      placeholder: "Loading...",
      question: {
        answers: []
      }
    });
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
  
  answerBodyChangedHandler = (value, answerId) => {
    const question = {...this.state.question};
    const answer = question.answers.find((answer) => answer.id === answerId );
    answer.body = value.toString('html');
    this.setState({question});
  };
  
  answerFeedbackChangedHandler = (value, answerId) => {
    const question = {...this.state.question};
    const answer = question.answers.find((answer) => answer.id === answerId );
    answer.feedback = value.toString('html');
    this.setState({question});
  };
  
  answerMakeCorrectHandler = (answerId) => {
    const question = {...this.state.question};
    question.answers.map(answer => {
      answer.is_correct = answer.id === answerId;
    });
    this.setState({question});
  };
  
  answerDeleteHandler = (answerId) => {
    let question = {...this.state.question};
    question.answers = question.answers.filter(answer => answer.id !== answerId);
    question = this.updateAnswersRank(question);
    this.setState({question});
  };
  
  answerMoveUpHandler = (answerId) => {
    let question = {...this.state.question};
    for (let index=0; index<question.answers.length; index++) {
      if (question.answers[index].id === answerId) {
        const tmp = {...question.answers[index]};
        question.answers[index] = {...question.answers[index - 1]};
        question.answers[index - 1] = tmp;
        break
      }
    }
    question = this.updateAnswersRank(question);
    this.setState({question});
  };
  
  answerMoveDownHandler = (answerId) => {
    let question = {...this.state.question};
    
    for (let index=0; index<question.answers.length; index++) {
      if (question.answers[index].id === answerId) {
        const tmp = {...question.answers[index]};
        question.answers[index] = {...question.answers[index + 1]};
        question.answers[index + 1] = tmp;
        break
      }
    }
    question = this.updateAnswersRank(question);
    this.setState({question});
  };
  
  updateAnswersRank = (question) => {
    question.answers.map((answer, index) => {
      answer.rank = index + 1;
    });
    return question
  };
  
  render() {
    return (
        <Question
          data={this.state.question}
          addAnswer={this.addAnswerHandler}
          questionBodyChange={this.questionBodyChangeHandler}
          answerBodyChanged={this.answerBodyChangedHandler}
          answerFeedbackChanged={this.answerFeedbackChangedHandler}
          answerMakeCorrect={this.answerMakeCorrectHandler}
          answerDelete={this.answerDeleteHandler}
          answerMoveDown={this.answerMoveDownHandler}
          answerMoveUp={this.answerMoveUpHandler}
          discard={this.discardHandler}
        />
    );
  }
}
export default QuestionDetails;