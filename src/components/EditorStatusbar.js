import EditorStatusbarButtons from './EditorStatusbarButtons';
const EditorStatusbar = (props) => {

  return (
    <div className='statusbar'>
      {
        <EditorStatusbarButtons amountOfQuestions={props.amountOfQuestions}
                          handleChangeQuestion={props.handleChangeQuestion}
                          questionIndex={props.questionIndex}
                          handleAddQuestion={props.handleAddQuestion}/>
      }
    </div>
  )
}
export default EditorStatusbar
