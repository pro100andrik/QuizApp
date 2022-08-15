import React from 'react';

import './EditorNamePicker.css'

class CreatorNamePicker extends React.Component{
  constructor(props) {
    super(props);
    this.state = ({
      newName: this.props.newName
    })
  }

  handleEditName = (newName) => {
    this.setState({
      newName: newName
    })
  }

  handleSaveNewName = () => {
    this.props.handleEditName(this.state.newName)
  }

  handleWatchPressedKey = (e) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' ){
      this.handleSaveNewName()
    }
  }

  render() {
    return(
      <div>
        Enter name of you Quiz:
        <br />
        <input className='editor-name-picker'
               type='text'
               onKeyDown={(e) => this.handleWatchPressedKey(e)}
               onChange={(e) => this.handleEditName(e.target.value)}
               value={this.state.newName}
               placeholder='press "Enter" for set name'></input>
        <button onClick={this.handleSaveNewName}> Save name </button>                                 {/*finish me!*/}
      </div>
    )
  }
}

export default CreatorNamePicker
