/* eslint-disable operator-linebreak */
/* eslint-disable quotes */
"use strict";

const score = document.querySelector(".game-score");
const buttonStart = document.querySelector(".start");
const messageLose = document.querySelector(".message-lose");
const messageStart = document.querySelector(".message-start");
const messageWin = document.querySelector(".message-win");

function getRandomIntInclusive(min, max) {
  return Math.floor(
    Math.random() * (Math.floor(max) - Math.ceil(min) + 1) + Math.ceil(min)
  );
}

function restartGame() {
  const cells = document.querySelectorAll(".field-cell");

  for (const cell of cells) {
    cell.innerHTML = "";
    cell.className = "field-cell";
  }

  score.innerHTML = "0";
  messageLose.hidden = true;
  messageStart.hidden = true;
  messageWin.hidden = true;

  numberAdder(3);
}

function numberAdder(times = 1) {
  for (let i = 0; i < times; i++) {
    const emptyFields = [...document.querySelectorAll(".field-cell")].filter(
      (cell) => !cell.innerHTML.length
    );

    if (!emptyFields.length) {
      return;
    }

    const randomEmptyCell =
      emptyFields[getRandomIntInclusive(0, emptyFields.length - 1)];
    const value = Math.random() > 0.1 ? "2" : "4";

    randomEmptyCell.innerHTML = value;
    randomEmptyCell.classList.add(`field-cell--${value}`);
  }
}

function gameWinner() {
  const allCells = document.querySelectorAll(".field-cell");
  const has2048 = [...allCells].find((el) => el.innerHTML === "2048");

  if (has2048) {
    messageWin.hidden = false;
  }
}

function clearEmptyCells(array) {
  return array.filter((el) => el !== 0);
}

function transformIntoArray(array) {
  return array
    .filter((el) => el.innerHTML)
    .map((el) => el.innerHTML)
    .map(Number);
}

function moveBottom(array, childIndex) {
  let result = [];

  array.forEach((el) => {
    result.push(+el.children[childIndex].innerHTML);
  });

  result = clearEmptyCells(result.reverse());

  if (result.length > 0) {
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i] === result[i + 1]) {
        score.innerHTML = +score.innerHTML + result[i + 1] * 2;
        result[i + 1] *= 2;
        result[i] = 0;
      }
    }
  }

  result = clearEmptyCells(result.reverse());

  while (result.length < 4) {
    result.unshift(0);
  }

  array.forEach((el, i) => {
    el.children[childIndex].innerHTML = result[i] || "";
  });
}

function moveTop(array, childIndex) {
  let result = [];

  array.forEach((el) => {
    result.push(+el.children[childIndex].innerHTML);
  });

  result = clearEmptyCells(result);

  if (result.length > 0) {
    for (let i = 0; i < result.length - 1; i++) {
      if (result[i] === result[i + 1]) {
        score.innerHTML = +score.innerHTML + result[i] * 2;
        result[i] *= 2;
        result[i + 1] = 0;
      }
    }
  }

  result = clearEmptyCells(result);

  while (result.length < 4) {
    result.push(0);
  }

  array.forEach((el, i) => {
    el.children[childIndex].innerHTML = result[i] || "";
  });
}

function moveLeft(array) {
  array.forEach((el) => {
    let cells = el.querySelectorAll(".field-cell");

    cells = transformIntoArray([...cells]);

    if (cells.length > 0) {
      for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i] === cells[i + 1]) {
          score.innerHTML = +score.innerHTML + cells[i] * 2;
          cells[i] *= 2;
          cells[i + 1] = 0;
        }
      }
    }

    cells = clearEmptyCells(cells);

    while (cells.length < 4) {
      cells.push(0);
    }

    for (let i = 0; i < el.children.length; i++) {
      el.children[i].innerHTML = cells[i] || "";
    }
  });
}

function moveRight(array) {
  array.forEach((el) => {
    let cells = el.querySelectorAll(".field-cell");

    cells = transformIntoArray([...cells]).reverse();

    if (cells.length > 0) {
      for (let i = 0; i < cells.length - 1; i++) {
        if (cells[i] === cells[i + 1]) {
          score.innerHTML = +score.innerHTML + cells[i] * 2;
          cells[i] *= 2;
          cells[i + 1] = 0;
        }
      }
    }

    cells = clearEmptyCells(cells.reverse());

    while (cells.length < 4) {
      cells.unshift(0);
    }

    for (let i = el.children.length - 1; i >= 0; i--) {
      el.children[i].innerHTML = cells[i] || "";
    }
  });
}

function possibleMove(array) {
  moveTop(array, 0);
  moveTop(array, 1);
  moveTop(array, 2);
  moveTop(array, 3);
  moveBottom(array, 0);
  moveBottom(array, 1);
  moveBottom(array, 2);
  moveBottom(array, 3);
  moveLeft(array);
  moveRight(array);
}

function gameOver() {
  messageLose.hidden = false;
  messageStart.hidden = true;
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode < 37 || e.keyCode > 40) {
    return;
  }

  const trs = document.querySelectorAll(".field-row");
  const allCells = document.querySelectorAll(".field-cell");
  let notMoved = document.querySelectorAll(".field-cell");

  notMoved = [...notMoved].map((item) => item.innerHTML);
  addClassesToCells(allCells);

  switch (e.keyCode) {
    case 37:
      moveLeft(trs);
      break;
    case 38:
      moveTop(trs, 0);
      moveTop(trs, 1);
      moveTop(trs, 2);
      moveTop(trs, 3);
      break;
    case 39:
      moveRight(trs);
      break;
    case 40:
      moveBottom(trs, 0);
      moveBottom(trs, 1);
      moveBottom(trs, 2);
      moveBottom(trs, 3);
      break;
  }

  gameWinner();

  let moved = document.querySelectorAll(".field-cell");

  moved = [...moved].map((item) => item.innerHTML);

  if (JSON.stringify(notMoved) !== JSON.stringify(moved)) {
    numberAdder();
    addClassesToCells(allCells);
  }

  const emptyFields = [...document.querySelectorAll(".field-cell")].filter(
    (el) => el.innerHTML.length === 0
  );

  if (emptyFields.length === 0) {
    const notChangedCells = document.querySelectorAll(".field-cell");
    const beforeMove = [...notChangedCells].map((item) => item.innerHTML);

    possibleMove(trs);

    let changedCells = document.querySelectorAll(".field-cell");

    changedCells = [...changedCells].map((item) => item.innerHTML);

    if (JSON.stringify(beforeMove) === JSON.stringify(changedCells)) {
      gameOver();
    } else {
      for (let i = 0; i < notChangedCells.length; i++) {
        notChangedCells[i].innerHTML = beforeMove[i];
      }
    }
  }
});

document.addEventListener("click", (e) => {
  if (e.target.classList.contains("start")) {
    numberAdder(3);

    messageStart.hidden = true;

    buttonStart.classList.remove("start");
    buttonStart.classList.add("restart");
    buttonStart.innerHTML = "Restart";
  }

  if (e.target.classList.contains("restart")) {
    restartGame();
  }
});

function addClassesToCells(array) {
  array.forEach((cell) => {
    cell.className = "field-cell";

    if (cell.innerHTML && isPowerOf2(+cell.innerHTML)) {
      cell.classList.add(`field-cell--${cell.innerHTML}`);
    }
  });
}

function isPowerOf2(value) {
  return value && (value & (value - 1)) === 0;
}
