import './AlertMessage.css'

const AlertMessage = (props) => {
  if(Array.isArray(props.message)){
    return (
      <div className='alert-message'>
        <ul>{props.message.map((element, index) => {
          element = <li key={index}>{element}</li>
          return element
          })}
        </ul>
      </div>
    )
  }
  return (
    <div className='alert-message'>{props.message}</div>
  )
}

export default AlertMessage
