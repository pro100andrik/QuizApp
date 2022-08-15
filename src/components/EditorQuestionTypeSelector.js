import './EditorQuestionTypeSelector.css'
const EditorQuestionTypeSelector = (props) =>{
  return (
    <div className='question-type-selector'>Question type:
      <input type='radio'
             name='type'
             id='single'
             checked={props.questionType === 'singleAnswer'}
             onChange={() => props.handleChangeType('singleAnswer')}>
      </input>
      <label htmlFor='single'>Single Answer</label>
      <input type='radio'
             name='type'
             id='multi'
             checked={props.questionType === 'multiAnswer'}
             onChange={() => props.handleChangeType('multiAnswer')}>
      </input>
    <label htmlFor='multi'>Multi Answer</label>
    </div>
  )
}

export default EditorQuestionTypeSelector
