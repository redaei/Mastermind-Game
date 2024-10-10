/*-------------------------------- Constants --------------------------------*/
const colorsSet = ['red', 'yellow', 'green', 'blue', 'orange', 'white']

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
const message = document.getElementById("message")

/*-------------------------------- Functions --------------------------------*/
const clickHole = (hole) => {
  if (!win && !lose){
    let lastClass = hole.target.classList[hole.target.classList.length - 1]
    if (lastClass === 'hole') {
      hole.target.classList.add(selectedColor)
    } else {
      hole.target.classList.remove(lastClass)
      hole.target.classList.add(selectedColor)
    }
    addAttempt(hole.target.id, selectedColor)
  }
  
}
const init = () => {
  win = false
  lose = false
  attemptsRemaining = 10
  tryIndex = 0
  message.innerText = "Try to find the colors in the exact order"
  code = []
  setNewCode()
  removeAllGuessRows()
  checkButton.disabled=false
  clearGuessRow()
}
const setNewCode = () => {
  //random code [ ,  ,  , ] from colorsSet
  for (let i = 0; i < 4; i++) {
    let test = colorsSet[Math.floor(Math.random() * colorsSet.length)]
    code.push(test)
  }
  CodeCopy = []
  CodeCopy = code.map((x) => x)
  // console.log(code)
  console.log(CodeCopy)
  updateCodeDisply()
}
const addAttempt = (index, holeColor) => {
  attempt[index] = holeColor
}
const tryFeedback = () => {
  // console.log(CodeCopy)
  // console.log(attempt)

  if (attempt.every((hole) => hole)) {
    feedback = [] //to empty feedback array

    CodeCopy.forEach((color, index) => {
      if (color === attempt[index]) {
        feedback.push('red')
        CodeCopy[index] = ''
        attempt[index] = ''
        //console.log(CodeCopy)
        //console.log(attempt)
      }
    })
    clearEmptyElm()
    attempt.forEach((hole, attInd) => {
      let codeInd = CodeCopy.findIndex((color) => {
        return hole === color
      })

      if (codeInd !== -1) {
        CodeCopy[codeInd] = ''
        attempt[attInd] = ''
       // console.log(CodeCopy)
       // console.log(attempt)
      }
    })
    clearEmptyElm()
    console.log(attemptsRemaining)

    //console.log(CodeCopy)
    //console.log(attempt)
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
  if(win || lose){
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
  guessRows.innerHTML = ""
  
}
//function to clear '' empty elements in array
const clearEmptyElm = () => {
  CodeCopy.forEach((color, index) => {
    if (color === '') {
      CodeCopy.splice(index, 1)
    }
  })
  attempt.forEach((color, index) => {
    if (color === '') {
      attempt.splice(index, 1)
    }
  })
}

const addGuessRow = () => {
  // tryIndex ++    ,    attemptsRemaining --
  tryIndex += 1
  attemptsRemaining -= 1
  //const guessClassList = activeGuessRow
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
  if(win){
    checkButton.disabled = true;
    updateCodeDisply()
    message.innerText = "You are smart!"
    const myPopup = new Popup({
      id: "my-popup",
      title: "Bravo!",
      content: "You win!",
      showImmediately: true
    })
  }
  else if(lose){
    checkButton.disabled = true;
    updateCodeDisply()
    message.innerText = "Is it hard? Try again!"
    const myPopup = new Popup({
      id: "my-popup",
      title: "Opss!",
      content: "You Lose!",
      showImmediately: true
    });
  }
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

init()
