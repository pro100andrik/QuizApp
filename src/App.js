import React from 'react';
import QUESTIONS from './components/QUESTIONS';
import FinishMessage from './components/FinishMessage';
import Menu from './components/Menu';
import QuizContainer from './components/QuizContainer';
import AlertMessage from './components/AlertMessage';

import './App.css';

function download(data, filename, type) {
    const file = new Blob([data], {type: type});
    if (window.navigator.msSaveOrOpenBlob) // IE10+
        window.navigator.msSaveOrOpenBlob(file, filename);
    else { // Others
        const a = document.createElement("a"),
                url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = ({
      tittleOfQuiz: 'Quiz maded by KonAnd in ReactJS',
      questions: QUESTIONS,
      quizFinished: false,
      displayType: 'menu',
      showAlert: false,
      alertMessage: 'alert'
    })
  }

  handleShowFinishMessage = (amountOfPoins) => {
    this.setState({
      quizFinished: true,
      amountOfPoins: amountOfPoins
    })
  }

  handleRestartQuiz = () => {
    this.setState({
      questions: this.state.questions.map(question =>{
        delete question.hadAnswer;
        question.answers.map(answer => answer.chosen = false)
        question.active = false;
        return question;
      }),
      quizFinished: false,
      displayType: 'menu'
    })
  }

  loadNewQuiz = (newTittle, newQuestions) => {
    this.setState({
      tittleOfQuiz: newTittle,
      questions: newQuestions.map(question =>{
        delete question.hadAnswer;
        question.answers.map(answer => answer.chosen = false)
        question.active = false;
        return question;
      }),
      numberOfAnswered: 0,
      displayType: 'menu'
    })
  }

  handleShowAlert = (alertMessage) => {
    this.setState({
      showAlert: true,
      alertMessage,
    })
    setTimeout(() => {
      this.setState({
        showAlert: false,
        alertMessage: 'alert',
      })
    }, 3000)
  }

  // menu handlers ----------------------------------------

  handleStartQuiz = () => {
    this.setState({
      quizStarted: true,
      displayType: 'quiz',
    })
  }

  handleStartCreator = () => {
    this.setState({
      displayType: 'creator'
    })
  }

  handleStartEditor = () => {
    this.setState({
      displayType: 'editor'
    })
  }

  handleSaveQuestionstoFile = () => {
    const contentOfFile = {
      tittleOfQuiz: this.state.tittleOfQuiz,
      questions: this.state.questions.map(question => {
        question.answers.map(answer => {
          delete answer.chosen
          return answer
        })
        return question
      })
    }
    const data = JSON.stringify(contentOfFile)
    download(data, this.state.tittleOfQuiz + '.quiz', 'text/plain')
  }

  handleUploadQuizFromFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = readerEvent => {
      const data = readerEvent.target.result;
      const loadedQuiz = JSON.parse(data)
      this.setState({
        tittleOfQuiz: loadedQuiz.tittleOfQuiz,
        questions: loadedQuiz.questions
      })
    }
  }

// end of menu handlers ---------------------------------------

  render() {


    return(
      <>
      <div className='mainContainer'>
        <div className='caption'> Quiz </div>
        <div className='quiz-wrapper'>
          {this.state.displayType === 'menu'
            ?
          <Menu tittleOfQuiz={this.state.tittleOfQuiz}
            handleSaveQuestionstoFile={this.handleSaveQuestionstoFile}
            handleUploadQuizFromFile={this.handleUploadQuizFromFile}
            handleStartQuiz={this.handleStartQuiz}
            handleStartCreator={this.handleStartCreator}
            handleStartEditor={this.handleStartEditor}/>
            :
          <QuizContainer questions={this.state.questions}
            handleShowFinishMessage={this.handleShowFinishMessage}
            loadNewQuiz={this.loadNewQuiz}
            quizStarted={this.state.quizStarted}
            tittleOfQuiz={this.state.tittleOfQuiz}
            displayType={this.state.displayType}
            handleShowAlert={this.handleShowAlert}/>
          }

      </div>
      </div>

      {this.state.quizFinished
        ?
      <FinishMessage amountOfPoins={this.state.amountOfPoins}
                     totalPoins={this.state.questions.length}
                     handleRestartQuiz={this.handleRestartQuiz}/>
        :
      null }

      {this.state.showAlert
        ?
      <AlertMessage message={this.state.alertMessage}/>
        :
      null
      }

    </>
    )
  }

}

export default App;
