import StatusbarButtons from './StatusbarButtons';
const Statusbar = (props) => {

  return (
    <div className='statusbar'>
      {
        <StatusbarButtons numberOfQuestions={props.numberOfQuestions}
                          handleChangeQuestion={props.handleChangeQuestion}
                          indexOfActiveQuestionNow={props.indexOfActiveQuestionNow}
                          questionIsAnswered={props.questionIsAnswered}/>
      }
    </div>
  )
}
export default Statusbar
