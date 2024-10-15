/*-------------------------------- Constants --------------------------------*/
const colorsSet = ['red', 'yellow', 'green', 'blue', 'orange', 'white']
const backAudio = new Audio('./sounds/The-Ant-Hill-Gang-Goes-West.mp3')
const actionSound = new Audio('./sounds/Footstep_Tile_Right_3.mp3')
/*---------------------------- Variables (state) ----------------------------*/
let attemptsRemaining = 10
let tryIndex = 0
let code = ['red', 'yellow', 'red', 'blue']
let CodeCopy = []
let selectedColor
let feedback = []
let attempt = ['', '', '', '']
let win = false
let lose = false

/*------------------------ Cached Element References ------------------------*/
const guessRows = document.getElementById('guess-rows')
const activeGuessRow = document
  .getElementById('main-guess-row')
  .querySelectorAll('div')
const colorsSetEl = document.getElementById('color-set').querySelectorAll('div')
const codeEls = document.getElementById('code').querySelectorAll('div')
const startButton = document.querySelector('#start-button')
const checkButton = document.querySelector('#check')
const message = document.getElementById('message')
const mainRow = document.querySelector('.main-row')

/*-------------------------------- Functions --------------------------------*/
const clickHole = (hole) => {
  if (!win && !lose) {
    actionSound.play()
    let lastClass = hole.target.classList[hole.target.classList.length - 1]
    if (lastClass === 'hole') {
      hole.target.classList.add(selectedColor)
    } else {
      hole.target.classList.remove(lastClass)
      hole.target.classList.add(selectedColor)
    }
    addAttempt(hole.target.id, selectedColor)
    if (attempt.every((hole) => hole !== '')) {
      checkButton.removeAttribute('title')
      checkButton.classList.remove('dontClick')
      checkButton.classList.add('clickAllowed')
    }
  }
}
const init = () => {
  backAudio.play()
  win = false
  lose = false
  attemptsRemaining = 10
  tryIndex = 0
  checkButton.classList.add('dontClick')
  checkButton.title = 'Fill the blanks first!'
  message.innerHTML = `Try to find the colors in the exact order.</br> You have <span class="attempts">${attemptsRemaining}</span> attempts remaining.`
  code = []
  setNewCode()
  removeAllGuessRows()
  unSelectColor()
  checkButton.disabled = false
  clearGuessRow()
  mainRow.removeAttribute('disabled')
}
const setNewCode = () => {
  //generate random code [ ,  ,  , ] from colorsSet
  for (let i = 0; i < 4; i++) {
    let test = colorsSet[Math.floor(Math.random() * colorsSet.length)]
    code.push(test)
  }
  CodeCopy = []
  CodeCopy = code.map((x) => x)

  console.log(CodeCopy)
  updateCodeDisply()
}
const addAttempt = (index, holeColor) => {
  attempt[index] = holeColor
}
const tryFeedback = () => {
  if (attempt.every((hole) => hole)) {
    feedback = [] //to empty feedback array

    CodeCopy.forEach((color, index) => {
      if (color === attempt[index]) {
        feedback.push('red')
        CodeCopy[index] = 'X'
        attempt[index] = 'X'
      }
    })

    clearEmptyElm()

    if (feedback.length < 4) {
      attempt.forEach((hole, attInd) => {
        let codeInd = CodeCopy.findIndex((color) => {
          return hole === color
        })

        if (
          codeInd !== -1 &&
          CodeCopy[codeInd] !== 'X' &&
          attempt[attInd] !== 'X'
        ) {
          CodeCopy[codeInd] = 'X'
          attempt[attInd] = 'X'
          feedback.push('white')
        }
      })
    }

    clearEmptyElm()

    addGuessRow()
    checkWinLose()
  }
}
const updateCodeDisply = () => {
  codeEls.forEach((hole) => {
    let lastClass = hole.classList[hole.classList.length - 1]
    if (lastClass !== 'hole') {
      hole.className = 'hole'
    }
  })
  if (win || lose) {
    code.forEach((codeColor, index) => {
      codeEls[index].innerText = ''
      codeEls[index].classList.add(codeColor)
    })
  } else {
    code.forEach((codeColor, index) => {
      codeEls[index].innerText = '?'
      codeEls[index].classList.remove(codeColor)
    })
  }
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
const removeAllGuessRows = () => {
  guessRows.innerHTML = ''
}
//function to clear 'X' empty elements in array
const clearEmptyElm = () => {
  for (let i = 0; i <= 4; i++) {
    if (CodeCopy[i] === 'X') {
      CodeCopy.splice(i, 1)
    }
  }

  for (let i = 0; i < 4; i++) {
    if (attempt[i] === 'X') {
      attempt.splice(i, 1)
    }
  }
}

const addGuessRow = () => {
  tryIndex += 1
  attemptsRemaining -= 1
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

  newGuessRow.className = 'guess-attempts'
  newGuessRow.appendChild(newAttemptNoDiv)
  newGuessRow.appendChild(newAttptColors)
  newGuessRow.appendChild(newFeedback)

  guessRows.prepend(newGuessRow)

  CodeCopy = []
  CodeCopy = code.map((x) => x)
  clearGuessRow()
}
const checkWinLose = () => {
  //if win?
  if (feedback.every((color) => color === 'red') && feedback.length === 4) {
    console.log('Win!')
    win = true
  }
  //if lose?
  if (!win && attemptsRemaining < 1) {
    console.log('lose!')
    lose = true
  }
  //show message + pop-up
  if (win) {
    checkButton.disabled = true
    mainRow.setAttribute('disabled', true)
    updateCodeDisply()
    message.innerText = 'You are smart!'
    const myPopup = new Popup({
      id: 'my-popup',
      title: 'Bravo!',
      content: 'You win!',
      showImmediately: true
    })
  } else if (lose) {
    checkButton.disabled = true
    mainRow.setAttribute('disabled', true)
    updateCodeDisply()
    message.innerText = 'Is it hard? Try again!'
    const myPopup = new Popup({
      id: 'my-popup',
      title: 'Opss!',
      content: 'You Lose!',
      showImmediately: true
    })
  } else {
    message.innerHTML = `Try to find the colors in the exact order.</br> You have <span class="attempts">${attemptsRemaining}</span> attempts remaining.`
  }
}

const unSelectColor = () => {
  colorsSetEl.forEach((color) => {
    color.classList.remove('selectedColor')
  })
}
/*----------------------------- Event Listeners -----------------------------*/
colorsSetEl.forEach((color) => {
  color.addEventListener('click', (event) => {
    selectedColor = event.target.id
    unSelectColor()
    event.target.classList.add('selectedColor')
  })
})
activeGuessRow.forEach((hole) => {
  hole.addEventListener('click', clickHole)
  hole.addEventListener('mouseenter', (event) => {
    if (event.target.classList.length === 1) {
      if (selectedColor) {
        event.target.classList.add(selectedColor.toUpperCase())
      }
    }
  })

  hole.addEventListener('mouseleave', (event) => {
    if (selectedColor) {
      event.target.classList.remove(selectedColor.toUpperCase())
    }
  })
})

startButton.addEventListener('click', init)
checkButton.addEventListener('click', tryFeedback)

/*----------------------------- Initialize The Game -----------------------------*/
backAudio.loop = true
backAudio.volume = 0.2
init()
