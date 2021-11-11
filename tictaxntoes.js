const tictaX = 'x'
const tOes = 'circle'
const validWinCombos= [
    // 
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
        // SELECTING ALL THE CELL ELEMENTS
const cellElements = document.querySelectorAll('[data-cell]')
const game = document.getElementById('game')
const displayWinnerElement = document.getElementById('displayWinner')
    // CREATING THE RESTART BUTTON 
const restartButton = document.getElementById('restartButton')
const displayWinnerTextElement = document.querySelector('[display-winner]')
let tOesTurn

startGame()
    // CREATING THE RESTART GAME FUNCTION 
restartButton.addEventListener('click', startGame)
        // CREATING A START GAME FUNCTION
function startGame() {
    tOesTurn = false
    cellElements.forEach(cell => {
        // REMOVING THE X AND CIRCLE CLASS AT THE START OF A NEW GAME
        cell.classList.remove(tictaX)
        cell.classList.remove(tOes)
        cell.removeEventListener('click', handleClick)
            // CREATING A CLICK EVENT THAT ONLY HAPPENS ONCE A TURN
        cell.addEventListener('click', handleClick, { once: true })
    })

    setBoardHoverClass()
    displayWinnerElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target
    const currentClass = tOesTurn ? tOes : tictaX
    placeMark(cell, currentClass)
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns()
        setBoardHoverClass()
    }
}
        // CREATING THE END GAME FUNCTION
function endGame(draw) {
    if (draw) {
        displayWinnerTextElement.innerText = 'Draw!'
    } else {    
            // WHO EVERS TURN IT IT THAT WINS WILL POPULATE THE TEXT 'O's Wins!' or 'X's Wins'
        displayWinnerTextElement.innerText = `${tOesTurn ? "tOes" : "tictaX"} Wins!`
    }
            // ADDING THE SHOW CLASS
    displayWinnerElement.classList.add('show')
}
        // CREATING THE DRAW FUNCTION ONCE EACH CELL IS FILLED AND THERE IS NO WINNER
function isDraw() {
        // USING A DESTRUCTURE METHOD 
    return [...cellElements].every(cell => {
        return cell.classList.contains(tictaX) || cell.classList.contains(tOes)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}
    // CREATING THE FUNCTION THAT TAKES TURNS 
function swapTurns() {
    tOesTurn = !tOesTurn
}
    // CREATING THE CLASSLIST FOR O AND X SO IT WILL SHOW THE X OR O IF ITS THEIR TURN
function setBoardHoverClass() {
    game.classList.remove(tictaX)
    game.classList.remove(tOes)
    if (tOesTurn) {
        game.classList.add(tOes)
        currentTurn.innerText = `tOes' Turn!`
        

    } else {
        game.classList.add(tictaX)
        currentTurn.innerText = `tictaX's Turn!`
      }
    }
        // CREATING THE FUNCTION THAT WILL CHECK FOR A WINNER
        // EACH WINNING COMBONATION WILL BE LOOPED OVER TO CHECK FOR WINNER
function checkWin(currentClass) {
    return validWinCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}
