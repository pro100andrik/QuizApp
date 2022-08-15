const Controls = (props) => {

  const handleChangeQuestion = (type) => {
    props.handleChangeQuestion(type)
  }

  const handleEndQuiz = () => {
    props.countPoinsAndEndQuiz()
  }

  return (
    <div className='controls'>
      <div className='buttons-container'>
        <button onClick={() => handleChangeQuestion ('previous')}> Previous </button>
        <button onClick={() => handleChangeQuestion ('next')}> Next </button>
        {props.numberOfAnswered === props.numberOfTotalQuestions
          ?
        <button onClick={handleEndQuiz}> Finish </button>
          :
        null
        }

      </div>
    </div>
  )
}
export default Controls
