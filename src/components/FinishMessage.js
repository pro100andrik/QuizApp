import './FinishMessage.css'

const FinishMessage = (props) => {

  return (
    <div className='finish-wrapper'>
      <div className='finish-container'>
        <div className='finish-message-container'>
          <div className='finish-message'> You get {props.amountOfPoins} poins of {props.totalPoins}</div>
          <button onClick={props.handleRestartQuiz}> Restart </button>
        </div>
      </div>

    </div>
  )
}
export default FinishMessage
