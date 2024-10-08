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
const setNewCode = () => {
  //random code [ ,  ,  , ] from colorsSet
}
const addAttempt = (index, holeColor) => {
  attempt[index] = holeColor
}
const tryFeedback = () => {
  if (attempt.every((hole)=> hole)){
    //make sure to empty feedback array 
    attempt.forEach((hole,index)=>{
      if (hole===code[index]){
        feedback.push("red")
      } else if (code.includes(hole)){
        feedback.push("white")        
      }
        
    })
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
    let lastClass = hole.classList[hole.classList.length - 1]
    if (lastClass !== 'hole') {
      hole.className = 'hole'
    }
  })
}
const addGuessRow = () => {
  //add guess row to #guess-rows in index.html (3 divs) attempt No. #  +   attempt   +   feedback
  const newGuessRow = document.createElement("div")
  const newAttemptNoDiv = document.createElement("div")
  const newAttptColors = document.createElement ("div")
  const newFeedback = document.createElement("div")
  //
  const AttNumTxt = document.createTextNode("Attempt No.: " + tryIndex+1 ) 
//
  newAttemptNoDiv.className = "color-set"
  newAttemptNoDiv.appendChild(AttNumTxt)
  newAttptColors.className = "main-guess-row"
  newAttptColors.innerHTML = `<div class="hole ${attempt[0]}"></div> <div class="hole ${attempt[1]}"></div> <div class="hole ${attempt[2]}"></div> <div class="hole ${attempt[3]}"></div>`
  newFeedback.className = "control"
  newFeedback.innerHTML = `<div class="feedback">
                <div class="feedback-hole ${feedback[0]}"></div>
                <div class="feedback-hole ${feedback[1]}"></div>
                <div class="feedback-hole ${feedback[2]}"></div>
                <div class="feedback-hole ${feedback[3]}"></div>
                </div> `
  //
  newGuessRow.appendChild(newAttemptNoDiv)
  newGuessRow.appendChild(newAttptColors)
  newGuessRow.appendChild(newFeedback)

  guessRows.prepend(newGuessRow)
  
  
  // tryIndex ++    ,    attemptsRemaining --
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
