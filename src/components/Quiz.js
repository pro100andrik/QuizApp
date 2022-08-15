import React from 'react';
import Controls from './Controls';
import Statusbar from './Statusbar';
import CurrentQuestion from './CurrentQuestion';

import './Quiz.css'

class Quiz extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      questions: this.props.questions.map((question, index) => {
        question.answers.map(answer => answer.chosen = false)
        question.hadAnswer = false;
        question.active = false;
        if (index === 0){
          question.active = true;
        }
        return question;
      }),
      amountOfPoins: 0

    })
  }

  handleChangeQuestion = (type, targetQuestion) => {
    const currentQuestion = this.state.questions.findIndex(element => element.active)
    switch(type){
      case 'previous':
        if(currentQuestion === 0){
          this.props.handleShowAlert('This is the first question.')
        }else{
          this.setState({
            questions: this.state.questions.map((element, index) => {
              if (index === currentQuestion){
                element.active = false;
              }else if (index === currentQuestion - 1){
                element.active = true;
              }
              return element
            })
          })
        }
        break;
      case 'next':
        if(currentQuestion === this.state.questions.length - 1){
          this.props.handleShowAlert('This is the last question.')
        }else{
          this.setState({
            questions: this.state.questions.map((element, index) => {
              if (index === currentQuestion){
                element.active = false;
              }else if (index === currentQuestion + 1){
                element.active = true;
              }
              return element
            })
          })
        }
        break;
      case 'jump':
        if(currentQuestion === targetQuestion){
          this.props.handleShowAlert('You are on this question allready.')
        }else{
          this.setState({
            questions: this.state.questions.map((element, index) => {
              if (index === currentQuestion){
                element.active = false;
              }else if (index === targetQuestion){
                element.active = true;
              }
              return element
            })
          })
        }
        break;
      default:
        break;
    }
  }

  changeAnswer = (questionIndex, answerIndex, type) => {
    if (type === 'single'){
      this.setState ({
        questions: this.state.questions.map((question,index) => {
          if (index === questionIndex){
            question.answers.map((answer, index) => {
              if (answerIndex === index){
                answer.chosen = true;
              }else{
                answer.chosen = false;
              }
              return answer
            })
          }
          return question
        })
      }, this.markAnswered)
    }else if (type === 'multi'){
      this.setState ({
        questions: this.state.questions.map((question,index) => {
          if (index === questionIndex){
            question.answers.map((answer, index) => {
              if (answerIndex === index){
                answer.chosen = !answer.chosen;
              }
              return answer
            })
          }
          return question
        })
      },this.markAnswered)
    }
  }

  markAnswered = () => {
    this.setState({
      questions: this.state.questions.map(question => {
        let numberOfAnwers = 0;
        question.answers.map(answer => {
          if (answer.chosen){
            numberOfAnwers++
          }
          return answer;
        })
        if (numberOfAnwers > 0){
          question.hadAnswer = true;
        } else {
          question.hadAnswer = false;
        }
        return question
      })
    }, this.countAnswered)
  }

  countAnswered = () => {
    const numberOfAnswered = this.state.questions.reduce((counter, question) => {
      if (question.hadAnswer){
        counter++
      }
      return counter
    }, 0)
    this.setState({
      numberOfAnswered: numberOfAnswered
    })
  }

  countPoinsAndEndQuiz = () => {
    const amountOfPoins = this.state.questions.reduce((poins, question) => {
      if (question.type === 'singleAnswer'){
        if(question.answers[question.answers.findIndex(element => element.chosen)].correct)
        poins++
      }else{
        const multiPoins = question.answers.reduce((multiPoins, answer) => {
          if (answer.chosen && answer.correct){
            multiPoins++
          }else if(answer.chosen && !answer.correct){
            multiPoins--
          }
          return multiPoins
        }, 0)
        const amountOfCorrect = question.answers.reduce((amount, answer) => {
          if (answer.correct){
            amount ++
          }
          return amount
        }, 0)
        if (multiPoins > 0){
          poins = poins + +((multiPoins / amountOfCorrect).toFixed(2))
        }
      }
      return poins
    },0)
    this.props.handleShowFinishMessage(amountOfPoins)
  }

  render() {
    return (
      <>
        <CurrentQuestion changeAnswer={this.changeAnswer}
          question={this.state.questions.find(question => question.active)}
          questionIndex={this.state.questions.findIndex(question => question.active)}/>

        <div className='navigation'>
          <Controls handleChangeQuestion={this.handleChangeQuestion}
                    numberOfAnswered={this.state.numberOfAnswered}
                    numberOfTotalQuestions={this.state.questions.length}
                    countPoinsAndEndQuiz={this.countPoinsAndEndQuiz}/>

          <Statusbar numberOfQuestions={this.state.questions.length}
                     handleChangeQuestion={this.handleChangeQuestion}
                     indexOfActiveQuestionNow={this.state.questions.findIndex(element => element.active)}
                     quizStarted={this.state.quizStarted}
                     questionIsAnswered={this.state.questions.map(element => element.hadAnswer)}/>
        </div>
      </>
    )
  }
}

export default Quiz
