import { getInput } from "../getInput.js";
import _ from "lodash";

export async function star7() {
  const input = await getInput(4).then((response) => {
    //console.log("response");
    //console.log(response);

    const inputArray = response.inputArray;

    let boards = [];

    for (let a = 0; a < 100; a++) {
      boards.push({
        rows: inputArray.slice(2 + 6 * a, 6 * a + 7).map((m) => {
          const stringArray = m.trim().replace("  ", " ").split(" ");
          const numberArray = stringArray.map((d) => parseInt(d));
          return numberArray;
        }),
      });
    }

    boards.forEach((b) => {
      b.columns = [];

      b.allNumbers = b.rows[0].concat(
        b.rows[1],
        b.rows[2],
        b.rows[3],
        b.rows[4]
      );
      for (let c = 0; c < 5; c++) {
        b.columns.push(b.rows.map((row) => row[c]));
      }
      b.lines = b.rows.concat(b.columns);
    });

    console.log(inputArray[0]);

    const turns = inputArray[0].split(",");
    console.log({ turns });

    let indexOfBoardWinner = -1;

    boards[0].rows[0][0] = 50;
    for (let t = 0; t < turns.length; t++) {
      const turn = parseInt(turns[t]);
      for (let a = 0; a < 100; a++) {
        for (let aa = 0; aa < 25; aa++) {
          if (boards[a].allNumbers[aa] == turn) {
            boards[a].allNumbers[aa] = 1000000;
          }
        }
        for (let b = 0; b < 10; b++) {
          for (let c = 0; c < 5; c++) {
            if (boards[a].lines[b][c] == turn) {
              boards[a].lines[b][c] = 1000000;
            }
          }
        }

        const reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        if (boards[a].lines.some((line) => line.reduce(reducer) == 5000000)) {
          console.log(`winning board is: ${a}`);
          console.log(boards[a]);
          indexOfBoardWinner = a;
          boards[a].allNumbers = boards[a].allNumbers.filter(
            (an) => an < 1000000
          );
          const sum = boards[a].allNumbers.reduce(reducer);

          console.log({ sum });
          console.log(sum * turn);

          a = 100;
          t = turns.length;
        }
      }
    }
  });
}

export async function star8() {
  const input = await getInput(4).then((response) => {
    //console.log("response");
    //console.log(response);

    const inputArray = response.inputArray;

    let boards = [];

    for (let a = 0; a < 100; a++) {
      boards.push({
        rows: inputArray.slice(2 + 6 * a, 6 * a + 7).map((m) => {
          const stringArray = m.trim().replace("  ", " ").split(" ");
          const numberArray = stringArray.map((d) => parseInt(d));
          return numberArray;
        }),
      });
    }

    boards.forEach((b) => {
      b.columns = [];

      b.allNumbers = b.rows[0].concat(
        b.rows[1],
        b.rows[2],
        b.rows[3],
        b.rows[4]
      );
      for (let c = 0; c < 5; c++) {
        b.columns.push(b.rows.map((row) => row[c]));
      }
      b.lines = b.rows.concat(b.columns);
    });

    const turns = inputArray[0].split(",");

    boards[0].rows[0][0] = 50;
    for (let t = 0; t < turns.length; t++) {
      const turn = parseInt(turns[t]);
      for (let a = 0; a < 100; a++) {
        const reducer = (previousValue, currentValue) =>
          previousValue + currentValue;
        if (!boards[a].won) {
          for (let aa = 0; aa < 25; aa++) {
            if (boards[a].allNumbers[aa] == turn) {
              boards[a].allNumbers[aa] = 1000000;
            }
          }
          for (let b = 0; b < 10; b++) {
            for (let c = 0; c < 5; c++) {
              if (boards[a].lines[b][c] == turn) {
                boards[a].lines[b][c] = 1000000;
              }
            }
          }

          if (boards[a].lines.some((line) => line.reduce(reducer) == 5000000)) {
            console.log(`winning board is: ${a}`);
            boards[a].won = true;
          }
        }
        if (boards.every((b) => b.won)) {
          boards[a].allNumbers = boards[a].allNumbers.filter(
            (an) => an < 1000000
          );
          const sum = boards[a].allNumbers.reduce(reducer);

          console.log({ sum });
          console.log(sum * turn);

          a = 100;
          t = turns.length;
        }
      }
    }
  });
}
