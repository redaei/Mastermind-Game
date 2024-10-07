/*-------------------------------- Constants --------------------------------*/
const colorsSet = ['red', 'yellow', 'green', 'blue', 'orange', 'white']

/*---------------------------- Variables (state) ----------------------------*/
let attemptsRemaining = 10
let tryIndex = 0
let code = ['red', 'yellow', 'green', 'blue']
let selectedColor
let feedback = []
const attempt = []

/*------------------------ Cached Element References ------------------------*/
const guessRows = document.getElementById('guess-rows')
const activeGuessRow = document
  .getElementById('main-guess-row')
  .querySelectorAll('div')
const colorsSetEl = document.getElementById('color-set').querySelectorAll('div')
const codeEls = document.getElementById('code').querySelectorAll('div')
const startButton = document.querySelector('#start-button')
const checkButton = document.querySelector('#check')

/*-------------------------------- Functions --------------------------------*/
const clickHole = (hole) => {
  let lastClass = hole.target.classList[hole.target.classList.length - 1]
  if (lastClass === 'hole') {
    hole.target.classList.add(selectedColor)
  } else {
    hole.target.classList.remove(lastClass)
    hole.target.classList.add(selectedColor)
  }
  addAttempt(hole.target.id, selectedColor)
  //console.log(hole)
}
const init = () => {
  //code = []
  updateCodeDisply()
  clearGuessRow()
}
const setNewCode = () => {}
const addAttempt = (index, holeColor) => {
  attempt[index] = holeColor
}
const tryFeedback = () => {
  //attempt.forEach() //here
}
const updateCodeDisply = () => {
  code.forEach((codeColor, index) => {
    if (code[0]) {
      codeEls[index].innerText = ''
      codeEls[index].classList.add(codeColor)
    } else {
      codeEls[index].innerText = '?'
      codeEls[index].classList.remove(codeColor)
    }
  })
}
const clearGuessRow = () => {
  activeGuessRow.forEach((hole) => {
    let lastClass = hole.classList[hole.classList.length - 1]
    if (lastClass !== 'hole') {
      hole.className = 'hole'
    }
  })
}
/*----------------------------- Event Listeners -----------------------------*/
colorsSetEl.forEach((color) => {
  color.addEventListener('click', (event) => {
    selectedColor = event.target.id
    // event.target.classList.add('selectedColor')
  })
})
activeGuessRow.forEach((hole) => {
  hole.addEventListener('click', clickHole)
  //   hole.addEventListener('mouseenter', (event) => {
  //     event.target.classList.add(selectedColor)
  //   })

  //   hole.addEventListener('mouseleave', (event) => {
  //     event.target.classList.remove(selectedColor)
  //   })
})

startButton.addEventListener('click', init)
checkButton.addEventListener('click', tryFeedback)
