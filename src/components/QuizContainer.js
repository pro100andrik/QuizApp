import Editor from './Editor';
import Quiz from './Quiz';
import './QuizContainer.css'
const QuizContainer = (props) => {

  return (
    <div className='quiz-container'>
      <div className='buttons-container'>
        {props.displayType === 'quiz'
          ?
        <Quiz questions={props.questions}
          handleShowAlert={props.handleShowAlert}
          handleShowFinishMessage={props.handleShowFinishMessage}/>
          :
        props.displayType === 'creator'
          ?
        <Editor tittleOfQuiz=''
                questions={[]}
                handleShowAlert={props.handleShowAlert}
                loadNewQuiz={props.loadNewQuiz}/>
          :
        props.displayType === 'editor'
          ?
        <Editor tittleOfQuiz={props.tittleOfQuiz}
                questions={props.questions}
                handleShowAlert={props.handleShowAlert}
                loadNewQuiz={props.loadNewQuiz}/>
          :
        null
        }

      </div>
    </div>
  )
}
export default QuizContainer
