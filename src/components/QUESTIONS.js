const QUESTIONS = [
  {
    type: 'singleAnswer',
    title: 'First President of USA',
    answers: [{label:'George Washington', correct: true}, {label:'Thomas Jefferson', correct: false},  {label:'Abraham Lincoln', correct: false}],
  },
  {
    type: 'singleAnswer',
    title: 'How many permanent teeth does a dog have?',
    answers: [{label:'40', correct: false}, {label:'36', correct: false}, {label:'42', correct: true}],
  },
  {
    type: 'multiAnswer',
    title: 'Which colors are included in rainbow?',
    answers: [{label:'Red', correct: true}, {label:'White', correct: false}, {label:'Blue', correct: true}, {label:'Pink', correct: false}],
  },
  {
    type: 'singleAnswer',
    title: 'What sport did David Beckham play?',
    answers: [{label:'Basketball', correct: false}, {label:'Football', correct: true}, {label:'Hockey', correct: false}],
  },
  {
    type: 'singleAnswer',
    title: 'How many notes are there in a musical scale?',
    answers: [{label:'6', correct: false}, {label:'7', correct: true}, {label:'8', correct: false}],
  },
  {
    type: 'singleAnswer',
    title: 'How many decimetres in a metre?',
    answers: [{label:'10', correct: true}, {label:'100', correct: false}, {label:'1000', correct: false}],
  },
  {
    type: 'singleAnswer',
    title: 'What colour are most buses in London?',
    answers: [{label:'Blue', correct: false}, {label:'Yellow', correct: false}, {label:'Red', correct: true}],
  }
]

export default QUESTIONS
