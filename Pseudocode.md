# Mastermind Game (code breaker)

* Define a constant named colorsSet as array with the list of colors ["red", "yellow", "green", "blue", "orange", "black"]
* Define a variable named attemptsRemaining , with initial value of 10, to track how many attempts are left for the user.
* I need to show the array of colors to the player.
* I need to create a constant that cached colorSet.
* I need a variable to store the tryIndex starting from 1. and after each try will increase by one, and until 10.
* I need to create a const that cached (GuessRows)
* I need to have a constant called (code) : where i will save the random code generated later on when inital the game.
* The CodeDisply will be at the top and will be hidden: an arry contain ["?","?","?","?"]
* I need to have a variable (selectedColor) to store the color selected by the player from ColorsSet array.
* also, the cached element (activeGuessRow) needs to be stored in a variable.
* also, I will store the (feedback) array in a variable, will contain array of (white, red, empty or mixed) based on current activeGuessRow and will show this array on the game board elements.
* I need to have a button to start / reset the game (Start New Game).
* I need to get an eventlistener to track when the user click on any of the colorsSet, then the selectedColor will store the selected one.
* I will have eventlistener to track clicks on the activeGuessRow to chang the color of the clicked hole to the selectedColor.
* Also, An eventlistener will be track click on (check button). this will check if the user fill all holes then will call tryFeedback function.
* I need to create function (tryFeedback) that will compare each hole in the activeGuessRow with the code and push red or white colors to feedback array based on the comparison result.
*In tryFeedback function: The try feedback shuld be reflect on the feedback result on the activeGuessRows. if the guess and the code are in exactly the right order (all feedback are red), the user win and the code showed to the user. else if there is no more GuessRows, the user lose. otherwise, the activeGuessRows will changed to the next one.
* Feedback Rules:
    * Each white peg means that one of the guessed colors is correct, but is in the wrong hole.
    * Each red peg means that one of the guessed colors is correct, and is in the right hole.
    * The order of the white and red pegs does not matter.
* I have to create a function updateCodeDisply() to update the CodeDisply in the start and end of the game. will be called after lose / win and in start new game.