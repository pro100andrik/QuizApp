import React from 'react';
import './Editor.css';
import EditorNamePicker from './EditorNamePicker';
import EditorCurrentQuestion from './EditorCurrentQuestion';

class Editor extends React.Component {
  constructor(props){
    super(props);

    if (this.props.questions.length === 0){
      this.state = ({
        questions: [
          {
            type: 'singleAnswer',
            title: '',
            answers: [
              {correct: false, label: ''},
              {correct: false, label: ''},
              {correct: false, label: ''}
            ],
            active: true,
          }
        ],
        tittleOfQuiz: this.props.tittleOfQuiz,
        editingType: 'editName'
      })
    }else{
      this.state = ({
        questions: this.props.questions.map((question, index) => {
          question.active = false;
          if (index === 0){
            question.active = true;
          }
          return question;
        }),
        tittleOfQuiz: this.props.tittleOfQuiz,
        editingType: 'editQuestions'
      })
    }



  }

  handleEditName = (tittleOfQuiz) => {
      this.setState({
        tittleOfQuiz: tittleOfQuiz,
        editingType: 'editQuestions'
      })
  }

  saveQuestion = (newQuestion, newQuestionIndex) => {
    const savedQuestions = this.state.questions.map((question, index) =>{
      if (index === newQuestionIndex){
        question = newQuestion;
      }
      return question
    })

    this.setState({
      questions: savedQuestions
    })
    return savedQuestions
  }

  changeQuestion = (targetQuestionIndex) => {
    this.setState(prevState => {
      questions: prevState.questions.map((question, index) =>{
        if (index === targetQuestionIndex){
                question.active = true
              }
        return question
      })
    })
  }

  handleAddQuestion = (questions) => {
    this.setState({
      questions: [
        ...questions.map((question) => {
          question.active = false
          return question
        }),
        {
          type: 'singleAnswer',
          title: '',
          answers: [
            {correct: false, label: ''},
            {correct: false, label: ''},
            {correct: false, label: ''}
          ],
          active: true,
        }
      ]

    })
  }

  handleRemoveQuestion = (questionIndex) => {
    if (this.state.questions.length < 2){
      this.props.handleShowAlert('Quiz must have at least one question.')
      return
    }
    this.setState({
      questions: this.state.questions.filter((_, index) => index !== questionIndex).map((question, index) => {
        if (questionIndex === 0 && index === 0){
          question.active = true;
        }else if (index === questionIndex - 1){
          question.active = true;
        }
        return question
      })
    })
  }

  validateQuiz = (questions) => {
    const errors = [];

    for (let i = 0; i < questions.length; i++){
      const response = [];
      if(questions[i].title === ''){
        response.push('fill question tittle')
      }
      if(questions[i].answers.findIndex((answer) => answer.correct === true) === -1){
        response.push('mark correct answer')
      }
      if(questions[i].answers.findIndex((answer) => answer.label === '') >= 0){
        response.push('fill all answers')
      }
      if (response.length > 0){
        errors.push('In question ' + +(i+1) + ' ' + response.join(' and '))
      }
    }
    if (errors.length > 0){
      return errors
    }
    return true

  }

  handleCloseEditor = (finalQuestions) => {
    const validationCheck = this.validateQuiz(finalQuestions);
    if (validationCheck !== true){
      this.props.handleShowAlert(validationCheck)
      return
    }
    const questionsToSave = finalQuestions.map(question => {
      delete question.active;
      return question
    })
    this.props.loadNewQuiz(this.state.tittleOfQuiz, questionsToSave)
  }

  render() {
    return (
      <div className='editor-container'>
        {this.state.editingType === 'editName'
          ?
        <EditorNamePicker handleEditName={this.handleEditName}
          newName={this.state.tittleOfQuiz}/>
          :
        this.state.editingType === 'editQuestions'
          ?
        <>
          <div>
            Tittle: {this.state.tittleOfQuiz}
            <button onClick={() => this.setState({editingType:'editName'})}>edit</button>
          </div>
          <EditorCurrentQuestion question={this.state.questions.find(question => question.active)}
            questionIndex={this.state.questions.findIndex(question => question.active)}
            amountOfQuestions={this.state.questions.length}
            saveQuestion={this.saveQuestion}
            changeQuestion={this.changeQuestion}
            handleShowAlert={this.props.handleShowAlert}
            handleAddQuestion={this.handleAddQuestion}
            handleRemoveQuestion={this.handleRemoveQuestion}
            handleCloseEditor={this.handleCloseEditor}/>

        </>

          :
        null
        }
      </div>
    )
  }
}

export default Editor
