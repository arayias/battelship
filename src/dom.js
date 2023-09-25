const renderBoard = (p1, p2) => {
  const body = document.querySelector("body");
  const main = document.createElement("main");
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");

  const player1El = document.createElement("div");
  const player2El = document.createElement("div");
  player1El.classList.add("your-board", "board");
  player2El.classList.add("enemy-board", "board");

  p1.board.board.forEach((row, i) => {
    row.forEach((cell, j) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.row = i;
      div.dataset.col = j;
      div.dataset.player = "player1";
      player1El.appendChild(div);
    });
  });

  p2.board.board.forEach((row, i) => {
    row.forEach((cell, j) => {
      const div = document.createElement("div");
      div.classList.add("cell");
      div.dataset.row = i;
      div.dataset.col = j;
      div.dataset.player = "player2";
      player2El.appendChild(div);
    });
  });

  boardContainer.appendChild(player1El);
  boardContainer.appendChild(player2El);
  main.appendChild(boardContainer);
  body.appendChild(main);
};

const rerenderBoard = (p1, p2) => {
  p1.board.board.forEach((row, i) => {
    row.forEach((cell, j) => {
      const currentDiv = document.querySelector(
        `.cell[data-row="${i}"][data-col="${j}"][data-player="player1"]`
      );
      if (cell === null) {
        currentDiv.classList.add("empty");
      } else {
        currentDiv.classList.add("ship");
      }
    });
  });

  const p2Hits = [...p2.board.missedShots, ...p2.board.hits];
  p2Hits.forEach((hit) => {
    const currentDiv = document.querySelector(
      `.cell[data-row="${hit[0]}"][data-col="${hit[1]}"][data-player="player2"]`
    );
    if (p2.board.board[hit[0]][hit[1]] === null) {
      currentDiv.classList.add("miss");
    } else {
      currentDiv.classList.add("hit");
    }
  });

  const p1Hits = [...p1.board.missedShots, ...p1.board.hits];
  p1Hits.forEach((hit) => {
    const currentDiv = document.querySelector(
      `.cell[data-row="${hit[0]}"][data-col="${hit[1]}"][data-player="player1"]`
    );
    if (p1.board.board[hit[0]][hit[1]] === null) {
      currentDiv.classList.add("miss");
    } else {
      currentDiv.classList.add("hit");
    }
  });
};

const renderHeadings = () => {
  const body = document.querySelector("body");
  const header = document.createElement("header");

  const heading = document.createElement("h1");
  heading.textContent = `BattleShip`;

  header.appendChild(heading);
  body.appendChild(header);
};

const renderStartButton = () => {
  const main = document.querySelector("main");
  const button = document.createElement("button");
  button.textContent = "Start Game";
  button.classList.add("start-button");
  main.appendChild(button);
};

const addListeners = (p1, p2) => {
  const cells = document.querySelectorAll(".cell");
  const body = document.querySelector("body");
  const startButton = document.querySelector(".start-button");

  const handleDirection = (e) => {
    if (e.key === "r") {
      p1.swapDirections();
    }
  };

  const handlePlacement = (e) => {
    const { row, col, player } = e.target.dataset;
    const pos = [parseInt(row), parseInt(col)];
    const isValid = p1.placeShip(pos);
    if (isValid) {
      rerenderBoard(p1, p2);
    }
    if (p1.ships.length === 0) {
      cells.forEach((cell) => {
        cell.removeEventListener("click", handlePlacement);
      });
      body.removeEventListener("keydown", handleDirection);
    }
  };

  const handleAttack = (e) => {
    const { row, col } = e.target.dataset;
    const pos = [parseInt(row), parseInt(col)];
    console.log(p1, p2);
    p1.attack(p2.board, pos) ? p2.attack(p1.board) : null;
    rerenderBoard(p1, p2);
    if (p2.board.allSunk()) {
      alert("You win!");
      cells.forEach((cell) => {
        cell.removeEventListener("click", handleAttack);
      });
    }
    if (p1.board.allSunk()) {
      alert("You lose!");
      cells.forEach((cell) => {
        cell.removeEventListener("click", handleAttack);
      });
    }
  };

  const handleStart = (e) => {
    if (p1.ships.length > 0) {
      return;
    }
    const button = e.target;
    button.remove();
    cells.forEach((cell) => {
      cell.addEventListener("click", handleAttack);
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener("click", handlePlacement);
  });
  body.addEventListener("keydown", handleDirection);
  startButton.addEventListener("click", handleStart);
};

module.exports = {
  renderBoard,
  renderHeadings,
  addListeners,
  renderStartButton,
};
