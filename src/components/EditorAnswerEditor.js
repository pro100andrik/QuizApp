import './EditorAnswerEditor.css'

const EditorAnswerEditor = (props) => {


  const handleChangeAnswer = (answerIndex, type) => {
    props.handleChangeAnswerCorrect(answerIndex, type)
  }
  return (
    <>


      {props.questionType === "singleAnswer"
        ?
      <div className='answers-container'>
        {props.answers.map((answer, index) => {
          return (
            <div className='editor-answer'
                 key={index}>
              <input type='radio'
                     name='question'
                     value={answer.label}
                     checked={answer.correct}
                     id={'answer' + index}
                     onChange={() => handleChangeAnswer(index, 'single')}>
              </input>
              <input type='text'
                     className='answer-label'
                     value={answer.label}
                     onChange={(e) => props.handleChangeAnswerLabel(index, e.target.value)}>
              </input>
              <button onClick={() => props.handleAddOrRemoveAnswer('removeByIndex', index)}> - </button>
           </div>
          )})}
        </div>
          :
        <div className='answers-container'>
          {props.answers.map((answer, index) => {
            return (
              <div className='editor-answer'
                   key={index}>
                <input type='checkbox'
                       name='question'
                       key={index}
                       value={answer.label}
                       checked={answer.correct}
                       id={'answer' + index}
                       onChange={() => handleChangeAnswer(index, 'multi')}>
                </input>
                <input type='text'
                       className='answer-label'
                       value={answer.label}
                       onChange={(e) => props.handleChangeAnswerLabel(index, e.target.value)}>
                </input>
                <button onClick={() => props.handleAddOrRemoveAnswer('removeByIndex', index)}> - </button>

             </div>
            )})}
          </div>
      }
    </>
  )
}

export default EditorAnswerEditor
