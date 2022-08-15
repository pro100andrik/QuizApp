import './Menu.css'
const Menu = (props) => {

  return (
    <div className='menu'>
      <div> Wellcome to {props.tittleOfQuiz}!</div>
      <br />
      <button onClick={props.handleStartQuiz}> Start Quiz </button>
      <br />
      <button onClick={props.handleStartCreator}> Make new Quiz </button>
      <br />
      <button onClick={props.handleStartEditor}> Edit current Quiz </button>
      <br />
      <button onClick={() => props.handleSaveQuestionstoFile()}>Save Quiz to file</button>
      <br />
      <div className='button-caption'>Upload Quiz from file:
        <input type="file"
          accept=".quiz"
          onChange={(e) => props.handleUploadQuizFromFile (e.target.files[0])}/>
      </div>
    </div>
  )
}
export default Menu
