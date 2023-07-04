const gameBoard = (() => {

    let gameBoardArr = [['', '', ''], ['', '', ''], ['', '', '']];

    const setGameBoard = (x, y, mark) => {
        if (gameBoardArr[x][y] == '') {
            gameBoardArr[x][y] = mark;
        }
    };
    const getGameBoard = () => gameBoardArr;
    const resetGameBoard = () => gameBoardArr = [['', '', ''], ['', '', ''], ['', '', '']];

    const displayGameBoardConsole = () => {
        console.table(gameBoardArr);
    };

    return { setGameBoard, getGameBoard, resetGameBoard, displayGameBoardConsole };
})();

const displayController = (() => {



})();

const gameController = (() => {

    let gameBoardArr = gameBoard.getGameBoard();
    let numberOfTurns = 0;

    const checkWin = () => {

        //checks for row
        let successiveCounter = 0;
        let successiveCounterSign;


        //check rows for win situations
        for (row = 0; row <= 2; row++) {
            successiveCounterSign = gameBoardArr[row][0];

            for (col = 0; col <= 2; col++) {
                if (successiveCounterSign == gameBoardArr[row][col] && gameBoardArr[row][col] != '') {
                    numberOfTurns++;
                    successiveCounter++;
                } else {

                    if(gameBoardArr[row][col] != ''){
                        numberOfTurns++;
                    }

                    successiveCounter = 0;
                    continue;
                }
            }
        }

        //check columns for win situations
        for (col = 0; col <= 2; col++) {
            successiveCounterSign = gameBoardArr[0][col];

            for (row = 0; row <= 2; row++) {
                if (successiveCounterSign == gameBoardArr[row][col] && gameBoardArr[row][col] != '') {
                    successiveCounter++;
                } else {
                    successiveCounter = 0;
                    continue;
                }
            }
        }

        //check diagonals for win situation
        if (gameBoardArr[0][0] == gameBoardArr[1][1] && gameBoardArr[0][0] == gameBoardArr[2][2]) {
            successiveCounter = 3;
        } else if (gameBoardArr[0][2] == gameBoardArr[1][1] && gameBoardArr[0][2] == gameBoardArr[2][0]) {
            successiveCounter = 3;
        }

        let playerWinner;
        //check who won
        if (successiveCounter == 3) {
            alternatePlayerTurns();
            if (playerOne.myTurn == true) {
                playerWinner = "Player One";
            } else {
                playerWinner = "Player Two";
            }
            console.log(playerWinner + "wins!");
        } else if(numberOfTurns == 9) {
            console.log(' It\'s a tie!');
        }


    };

    const playerOne = {
        mark: "X",
        myTurn: true,
        score: 0
    }

    const playerTwo = {
        mark: "O",
        myTurn: false,
        score: 0

    }

    function alternatePlayerTurns() {
        if (playerOne.myTurn == true) {
            console.log("Player 2");
            playerOne.myTurn = false;
            playerTwo.myTurn = true;

            return playerOne.mark;
        } else {
            console.log("Player 1");
            playerOne.myTurn = true;
            playerTwo.myTurn = false;

            return playerTwo.mark;
        }

    };

    const begin = () => {
        console.log("let the game begin!");

        for (i = 1; i <= 9; i++) {
            let xPos = prompt("x position:");
            let yPos = prompt("y position:");
            gameBoard.setGameBoard(xPos, yPos, alternatePlayerTurns());
        }

    }

    return { checkWin, begin };

})();

// gameBoard.setGameBoard(0, 0, "O");
// gameBoard.setGameBoard(0, 1, "O");
// gameBoard.setGameBoard(0, 2, "X");
// gameBoard.setGameBoard(1, 0, "B");
// gameBoard.setGameBoard(1, 1, "X");
// gameBoard.setGameBoard(1, 2, "O");
// gameBoard.setGameBoard(2, 0, "O");
// gameBoard.setGameBoard(2, 1, "O");
// gameBoard.setGameBoard(2, 2, "X");

gameController.begin();
gameBoard.displayGameBoardConsole();

gameController.checkWin();

// gameController.begin();

