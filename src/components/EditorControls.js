const EditorControls = (props) => {

  return (
    <div className='controls'>
      <div className='buttons-container'>
        <button onClick={() => props.handleAddOrRemoveAnswer('add')}> Add answer </button>
        <button onClick={() => props.handleChangeQuestion('previous')}> Previous </button>
        <button onClick={() => props.handleChangeQuestion('next')}> Next </button>
        <button onClick={() => props.handleAddQuestion()}> Add question </button>
        <button onClick={() => props.handleRemoveQuestion(props.questionIndex)}> Remove current question </button>
        <button onClick={() => props.handleSaveQuizAndCloseEditor()}> Save quiz and close editor </button>
      </div>
    </div>
  )
}
export default EditorControls
