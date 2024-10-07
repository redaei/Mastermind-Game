/*-------------------------------- Constants --------------------------------*/
const colorsSet =  ["red", "yellow", "green", "blue", "orange", "white"]




/*---------------------------- Variables (state) ----------------------------*/
let attemptsRemaining = 10
let tryIndex = 0
let code = []
let selectedColor 
let feedback = []

/*------------------------ Cached Element References ------------------------*/
const guessRows = document.getElementById("guess-rows")
const activeGuessRow = document.getElementById("main-guess-row").querySelectorAll("div")
const colorsSetEl = document.getElementById("color-set").querySelectorAll("div")





/*-------------------------------- Functions --------------------------------*/








/*----------------------------- Event Listeners -----------------------------*/
colorsSetEl.forEach((color)=>{
    color.addEventListener("click", (event) => {
        selectedColor = event.target.id
         
    })
})
activeGuessRow.forEach((hole)=>{
    
})