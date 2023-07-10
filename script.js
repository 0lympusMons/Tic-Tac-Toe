

const Player = (mark) => {
    this.mark = mark;

    const getMark = () => {
        return mark;
    };

    return { getMark }
};


const gameBoard = (() => {

    let gameBoardArr = [['', '', ''], ['', '', ''], ['', '', '']];

    const setGameBoard = (x, y, mark) => {
        isOver = gameController.getResult();
        if (gameBoardArr[x][y] == '' && !(isOver.gameOver)) {
            gameBoardArr[x][y] = mark;
        }
        gameController.checkWin();
    };
    const getGameBoard = () => gameBoardArr;
    const resetGameBoard = () => gameBoardArr = [['', '', ''], ['', '', ''], ['', '', '']];

    const displayGameBoardConsole = () => {
        console.table(gameBoardArr);
    };

    return { setGameBoard, getGameBoard, resetGameBoard, displayGameBoardConsole };
})();

const gameController = (() => {

    let gameBoardArr = gameBoard.getGameBoard();
    let numberOfTurns = 0;
    let playerWinner;
    let isOver = {
        isTie: numberOfTurns != 9,
        gameOver: (playerWinner != undefined || numberOfTurns != 9)? false:true,
        playerWinner: playerWinner
    };

    const playerOne = Player('X');
    const playerTwo = Player('O');
    playerOne.myTurn = true;

    const getResult = ()=> {
        return isOver;
    }

    //checks the winner of the game
    const checkWin = () => {

        numberOfTurns++;

        //checks for row
        let successiveCounter = 0;
        let successiveCounterSign;



        //check who won
        const winnerChecker = () => {

            alternatePlayerTurns();
            if (playerOne.myTurn == true) {
                playerWinner = "Player One";
                isOver.gameOver = true;

            } else {
                playerWinner = "Player Two";
                isOver.gameOver = true;

            }
            console.log(playerWinner + "wins!");

        };


        //check rows for win situations
        for (row = 0; row <= 2; row++) {
            successiveCounter = 0;
            successiveCounterSign = gameBoardArr[row][0];

            for (col = 0; col <= 2; col++) {
                if (successiveCounterSign == gameBoardArr[row][col] && gameBoardArr[row][col] != '') {
                    successiveCounter++;

                    if (successiveCounter == 3) {
                        winnerChecker();
                    } else if (numberOfTurns == 9) {
                        console.log("It's a tie!")
                        isOver.gameOver = true;

                    }
                } else {

                    if (gameBoardArr[row][col] != '') {
                    }

                    successiveCounter = 0;
                    continue;
                }
            }
        }


        //check columns for win situations
        for (col = 0; col <= 2; col++) {
        successiveCounter = 0;

            successiveCounterSign = gameBoardArr[0][col];

            for (row = 0; row <= 2; row++) {
                if (successiveCounterSign == gameBoardArr[row][col] && gameBoardArr[row][col] != '') {
                    successiveCounter++;

                    if (successiveCounter == 3) {
                        winnerChecker();
                    } else if (numberOfTurns == 9) {
                        console.log("It's a tie!")
                    }
                } else {
                    successiveCounter = 0;
                    continue;
                }
            }
        }

        //check diagonals for win situation
        if (gameBoardArr[0][0] == gameBoardArr[1][1] && gameBoardArr[0][0] == gameBoardArr[2][2] && gameBoardArr[0][0] != '') {
            successiveCounter = 3;
            winnerChecker();
        } else if (gameBoardArr[0][2] == gameBoardArr[1][1] && gameBoardArr[0][2] == gameBoardArr[2][0] && gameBoardArr[0][2] != '') {
            successiveCounter = 3;
            winnerChecker();

        }




    };


    //alternate player turns

    function alternatePlayerTurns() {
        if (playerOne.myTurn == true) {
            console.log("Player 2");
            playerOne.myTurn = false;
            playerTwo.myTurn = true;

            displayController.setMark(playerOne.getMark());
            return playerOne.getMark();
        } else {
            console.log("Player 1");
            playerOne.myTurn = true;
            playerTwo.myTurn = false;

            displayController.setMark(playerTwo.getMark());
            return playerTwo.getMark();
        }

    };

    //play game

    const beginGame = () => {
        console.log("let the game begin!");

        for (i = 1; i <= 9; i++) {

            if (playerWinner == undefined) {
                // let xPos = prompt("x position:");
                // let yPos = prompt("y position:");
                // gameBoard.setGameBoard(xPos, yPos, alternatePlayerTurns());
                // let mark = alternatePlayerTurns();
                displayController.setMark(mark);
                gameBoard.displayGameBoardConsole();

                checkWin();
            } else {
                break;
            };



        }

    }

    return { checkWin, beginGame, alternatePlayerTurns, getResult };

})();



const displayController = (() => {

    let playerMark;
    let x, y;
    let isOver = gameController.getResult();

    const addMark = (e) => {

        if (e.target.innerText == '') {
            gameController.alternatePlayerTurns();
        }

        e.target.style.border = "red 1px solid";

        addToGameBoardArr(e);

        isOverUpdate();

        if(isOver.gameOver){
            console.log("yawa!!!");
            removeEventListener();
            announceWinner();
        }
    };

    function isOverUpdate(){
        isOver = gameController.getResult();
    }

    function addToGameBoardArr (e){
        x = parseInt(e.target.dataset.x);
        y = parseInt(e.target.dataset.y);
        gameBoard.setGameBoard(x, y, playerMark);

        //array to display
        e.target.innerHTML = (gameBoard.getGameBoard())[x][y];

    };

    const gridItems = document.querySelectorAll(".tictactoe__grid--item");
    gridItems.forEach(gridItem => gridItem.addEventListener('click', addMark));

    const setMark = (mark) => playerMark = mark;

    //remove event listener if winner exists
    const removeEventListener = () => {
        const gridItems = document.querySelectorAll(".tictactoe__grid--item");
        gridItems.forEach(gridItem => gridItem.removeEventListener('click', addMark));
    };

    function announceWinner(){
        let tictactoeWrapper = document.querySelector(".tictactoe__wrapper");
        let winnerText = document.createElement("h2");
        winnerText.innerText = "sesen way ligo";
        tictactoeWrapper.parentNode.insertBefore(winnerText, tictactoeWrapper)
    }

    //let resetBu

    return { setMark }

})();




    // gameBoard.setGameBoard(0, 0, "O");
    // gameBoard.setGameBoard(0, 1, "O");
    // gameBoard.setGameBoard(0, 2, "X");
    // gameBoard.setGameBoard(1, 0, "O");
    // gameBoard.setGameBoard(1, 1, "X");
    // gameBoard.setGameBoard(1, 2, "O");
    // gameBoard.setGameBoard(2, 0, "O");
    // gameBoard.setGameBoard(2, 1, "O");
    // gameBoard.setGameBoard(2, 2, "X");



    // gameController.begin();

    // gameBoard.setGameBoard(0, 0, "X");
    // gameBoard.setGameBoard(0, 1, "X");
    // gameBoard.setGameBoard(0, 2, "X");

    // gameBoard.displayGameBoardConsole();

    // gameController.checkWin();

    // gameController.beginGame();

