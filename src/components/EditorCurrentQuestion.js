import './EditorCurrentQuestion.css' // QDIT THIS
import React from 'react';
import EditorQuestionTypeSelector from './EditorQuestionTypeSelector';
import EditorAnswerEditor from './EditorAnswerEditor';
import EditorControls from './EditorControls';
import EditorStatusbar from './EditorStatusbar';



class EditorCurrentQuestion extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      questionType: this.props.question.type,
      questionTittle: this.props.question.title,
      answers: this.props.question.answers,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.questionIndex !== prevProps.questionIndex || this.props.question.title !== prevProps.question.title) {
      this.setState({
        questionType: this.props.question.type,
        questionTittle: this.props.question.title,
        answers: this.props.question.answers,
      })
    }
  }

  handleChangeQuestionTittle = (newTittle) => {
    this.setState ({
      questionTittle: newTittle
    })
  }

  handleChangeType = (type) => {
    this.setState ({
      questionType: type,
      answers: this.state.answers.map((answer) => {
          answer.correct = false
        return answer
      })
    })
  }

  handleChangeAnswerCorrect = (answerIndex, type) => {
    switch(type){
      case 'single':
        this.setState ({
          answers: this.state.answers.map((answer, index) => {
            if (index === answerIndex){
              answer.correct = true
            }else{
              answer.correct = false
            }
            return answer
          })
        })
        break
      case 'multi':
        this.setState ({
          answers: this.state.answers.map((answer, index) => {
            if (index === answerIndex){
              answer.correct = !answer.correct
            }
            return answer
          })
        })
        break
      default:
        break
    }

  }

  handleChangeAnswerLabel = (answerIndex, answerLabel) => {
    this.setState ({
      answers: this.state.answers.map((answer, index) => {
        if (index === answerIndex){
          answer.label = answerLabel
        }
        return answer
      })
    })
  }

  handleAddOrRemoveAnswer = (action, targetIndex) => {
    switch(action){
      case 'add':
        this.setState({
          answers: [...this.state.answers, {label:'', correct: false}]
        })
        break
      case 'remove':
        if (this.state.answers.length <= 2){
          this.props.handleShowAlert('Question must have at least two answers.')
        }else{
          this.setState({
            answers: this.state.answers.filter((_, index) => index !== this.state.answers.length - 1)
          })
        }
        break
      case 'removeByIndex':
        if (this.state.answers.length <= 2){
          this.props.handleShowAlert('Question must have at least two answers.')
        }else{
          this.setState({
            answers: this.state.answers.filter((_, index) => index !== targetIndex)
          })
        }
        break
      default:
        break
    }
  }

  validationCheck = (question) => {
    const response = [];
    if(question.questionTittle === ''){
      response.push('fill question tittle')
    }
    if(question.answers.findIndex((answer) => answer.correct === true) === -1){
      response.push('mark correct answer')
    }
    if(question.answers.findIndex((answer) => answer.label === '') >= 0){
      response.push('fill all answers')
    }
    if (response.length > 0){
      return response.join(' and ') + '.'
    }
    return true
  }

  handleChangeQuestion = (type, targetQuestionIndex) => {
    const validationCheck = this.validationCheck(this.state);
    if (validationCheck !== true){
      this.props.handleShowAlert(validationCheck)
    }
    else{
      const currentQuestion = this.props.questionIndex
      switch(type){
        case 'previous':
        if(currentQuestion === 0){
          this.props.handleShowAlert('This is the first question.')
        }else{
          const question = {
            type: this.state.questionType,
            title: this.state.questionTittle,
            answers: this.state.answers,
            active: false,
          }
          this.props.saveQuestion(question, this.props.questionIndex)
          this.props.changeQuestion(currentQuestion - 1)
          // this.props.saveQuestionAndChange(question, this.props.questionIndex, currentQuestion - 1)
        }
        break;
        case 'next':
        if(currentQuestion === this.props.amountOfQuestions - 1){
          this.props.handleShowAlert('This is the last question.')
        }else{
          const question = {
            type: this.state.questionType,
            title: this.state.questionTittle,
            answers: this.state.answers,
            active: false,
          }
          this.props.saveQuestion(question, this.props.questionIndex)
          this.props.changeQuestion(currentQuestion + 1)
          // this.props.saveQuestionAndChange(question, this.props.questionIndex, currentQuestion + 1)
        }
        break;
        case 'jump':
        if(currentQuestion === targetQuestionIndex){
          this.props.handleShowAlert('You are on this question allready.')
        }else{
          const question = {
            type: this.state.questionType,
            title: this.state.questionTittle,
            answers: this.state.answers,
            active: false,
          }
          this.props.saveQuestion(question, this.props.questionIndex)
          this.props.changeQuestion(targetQuestionIndex)
          // this.props.saveQuestionAndChange(question, this.props.questionIndex, targetQuestionIndex)
        }
        break;
        default:
        break;
      }
    }
  }

  handleAddQuestion = () => {
    const validationCheck = this.validationCheck(this.state);
    if (validationCheck !== true){
      this.props.handleShowAlert(validationCheck)
      return
    }
    const question = {
      type: this.state.questionType,
      title: this.state.questionTittle,
      answers: this.state.answers,
      active: false,
    }
    this.props.saveQuestion(question, this.props.questionIndex)
    const savedQuestions = this.props.saveQuestion(question, this.props.questionIndex)

    this.props.handleAddQuestion(savedQuestions)
  }

  handleSaveQuizAndCloseEditor = () => {
    const question = {
      type: this.state.questionType,
      title: this.state.questionTittle,
      answers: this.state.answers,
      active: true,
    }
    this.props.saveQuestion(question, this.props.questionIndex)
    const finalQuestions = this.props.saveQuestion(question, this.props.questionIndex)
    this.props.handleCloseEditor(finalQuestions)

  }

  render(){
    return (
      <>
        <EditorQuestionTypeSelector questionType={this.state.questionType}
                              handleChangeType={this.handleChangeType}/>

        <div className='question-title'>Question: <input type='text'
                              value={this.state.questionTittle}
                              onChange={(e) => this.handleChangeQuestionTittle(e.target.value)}></input>
        </div>

        <EditorAnswerEditor answers={this.state.answers}
          questionType={this.state.questionType}
          handleChangeAnswerLabel={this.handleChangeAnswerLabel}
          handleChangeAnswerCorrect={this.handleChangeAnswerCorrect}
          questionIndex={this.props.questionIndex}
          handleAddOrRemoveAnswer={this.handleAddOrRemoveAnswer}/>
        <div className='editor-navigation'>
          <EditorControls handleChangeQuestion={this.handleChangeQuestion}
            handleAddOrRemoveAnswer={this.handleAddOrRemoveAnswer}
            handleAddQuestion={this.handleAddQuestion}
            handleRemoveQuestion={this.props.handleRemoveQuestion}
            questionIndex={this.props.questionIndex}
            handleSaveQuizAndCloseEditor={this.handleSaveQuizAndCloseEditor}/>

          <EditorStatusbar handleChangeQuestion={this.handleChangeQuestion}
            amountOfQuestions={this.props.amountOfQuestions}
            questionIndex={this.props.questionIndex}
            handleAddQuestion={this.handleAddQuestion}/>
        </div>
      </>
    )
  }
}


export default EditorCurrentQuestion
