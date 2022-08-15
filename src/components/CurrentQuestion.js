import './CurrentQuestion.css'

const CurrentQuestion = (props) => {
  // useEffect(
  //   () => console.log(props.question)
  // )

  const handleChangeAnswer = (answerIndex, type) => {
    props.changeAnswer(props.questionIndex, answerIndex, type)
  }
  return (
    <>
      <div className='question-tittle'>{props.question.title}{props.question.type === "singleAnswer" ? null : '(Multiple Answer)'}</div>
      {props.question.type === "singleAnswer"
        ?
      props.question.answers.map((element, index) => {
        return (
          <div className={element.chosen ? 'answer chosen-answer' : 'answer'}
               key={index}
               onClick={() => handleChangeAnswer(index, 'single')}>
            {element.label}
         </div>
        )})
        :
        props.question.answers.map((element, index) => {
          return (
            <div className={element.chosen ? 'answer chosen-answer' : 'answer'}
                 key={index}
                 onClick={() => handleChangeAnswer(index, 'multi')}>
              {element.label}
           </div>
          )})
      }
    </>
  )
}

export default CurrentQuestion
