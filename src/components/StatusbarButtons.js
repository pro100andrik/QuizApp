import './StatusbarButtons.css'
const StatusbarButtons = (props) => {

  const handleChangeQuestion = (type, index) => {
    props.handleChangeQuestion(type, index)
  }



  return (
    <div className='buttons'>
      {new Array(props.numberOfQuestions).fill('').map((element, index) => {
        element = <button onClick={() => handleChangeQuestion('jump', index)}
                          key={index}
                          className={
                            props.indexOfActiveQuestionNow === index
                              ?
                            props.questionIsAnswered[index] === true
                              ?
                            'statusbar-button answered active'
                              :
                            'statusbar-button not-answered active'
                              :
                            props.questionIsAnswered[index] === true
                              ?
                            'statusbar-button answered'
                              :
                            'statusbar-button not-answered'
                          }>
                    {index + 1 }
                  </button>
        return element
      })}

    </div>
  )
}
export default StatusbarButtons
