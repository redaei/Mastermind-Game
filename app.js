/*-------------------------------- Constants --------------------------------*/
const colorsSet = ['red', 'yellow', 'green', 'blue', 'orange', 'white']

/*---------------------------- Variables (state) ----------------------------*/
let attemptsRemaining = 10
let tryIndex = 0
let code = ['red', 'yellow', 'green', 'blue']
let CodeCopy = []
let selectedColor
let feedback = []
let attempt = ['', '', '', '']

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
  CodeCopy = []
  CodeCopy = code.map((x) => x)
  updateCodeDisply()
  clearGuessRow()
}
const setNewCode = () => {
  //random code [ ,  ,  , ] from colorsSet
}
const addAttempt = (index, holeColor) => {
  attempt[index] = holeColor
}
const tryFeedback = () => {
  
  console.log(CodeCopy)
  console.log(attempt)

  if (attempt.every((hole) => hole)) {
    feedback = [] //to empty feedback array

    CodeCopy.forEach((color, index) => {
      if (color === attempt[index]) {
        feedback.push('red')
        CodeCopy[index] = ''
        attempt[index] = ''
        console.log("red: ")
        console.log(CodeCopy)
        console.log(attempt)
      }
    })
    attempt.forEach((hole, attInd) => {
      let codeInd = CodeCopy.findIndex((color) => {
        return hole === color
      })

      if (codeInd !== -1) {
        feedback.push('white')
        CodeCopy[codeInd] = ''
        attempt[attInd] = ''
        console.log(codeInd)
        console.log("white: ")
        console.log(CodeCopy)
        console.log(attempt)
      } else {
        
        console.log("empty hole");
        
      }
    })
    console.log("end: ")
    console.log(CodeCopy)
    console.log(attempt)
    addGuessRow()
  }
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
    attempt = ['', '', '', '']
    let lastClass = hole.classList[hole.classList.length - 1]
    if (lastClass !== 'hole') {
      hole.className = 'hole'
    }
  })
}
const addGuessRow = () => {
  // tryIndex ++    ,    attemptsRemaining --
  tryIndex += 1
  attemptsRemaining -= 1
  const guessClassList = activeGuessRow
  //add guess row to #guess-rows in index.html (3 divs) attempt No. #  +   attempt   +   feedback
  const newGuessRow = document.createElement('div')
  const newAttemptNoDiv = document.createElement('div')
  const newAttptColors = document.createElement('div')
  const newFeedback = document.createElement('div')

  const AttNumTxt = document.createTextNode('Attempt No.: ' + tryIndex)

  newAttemptNoDiv.className = 'color-set'
  newAttemptNoDiv.appendChild(AttNumTxt)
  newAttptColors.className = 'main-guess-row'
  newAttptColors.innerHTML = `<div class="hole ${activeGuessRow[0].classList[1]}"></div> <div class="hole ${activeGuessRow[1].classList[1]}"></div> <div class="hole ${activeGuessRow[2].classList[1]}"></div> <div class="hole ${activeGuessRow[3].classList[1]}"></div>`
  newFeedback.className = 'control'
  newFeedback.innerHTML = `<div class="feedback">
                <div class="feedback-hole ${feedback[0]}"></div>
                <div class="feedback-hole ${feedback[1]}"></div>
                <div class="feedback-hole ${feedback[2]}"></div>
                <div class="feedback-hole ${feedback[3]}"></div>
                </div> `
  //
  newGuessRow.className = 'guess-attempts'
  newGuessRow.appendChild(newAttemptNoDiv)
  newGuessRow.appendChild(newAttptColors)
  newGuessRow.appendChild(newFeedback)

  guessRows.prepend(newGuessRow)

  clearGuessRow()
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
