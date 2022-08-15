import './EditorStatusbarButtons.css'
const EditorStatusbarButtons = (props) => {

  return (
    <div className='buttons'>
      {new Array(props.amountOfQuestions + 1).fill('').map((element, index) => {
        if(index <= props.amountOfQuestions - 1){
          element = <button onClick={() => props.handleChangeQuestion('jump', index)}
            key={index}
            className={
              props.questionIndex === index
              ?
              'statusbar-button active'
              :
              'statusbar-button valid'
            }>
            {index + 1 }
          </button>
        }else{
          element = <button onClick={() => props.handleAddQuestion()}
            key={index}
            className='statusbar-button valid'>
            +
          </button>
        }
        return element
      })}

    </div>
  )
}
export default EditorStatusbarButtons
