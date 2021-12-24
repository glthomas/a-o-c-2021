import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";
import { parse } from "dotenv";

const config = {};
const math = create(all, config);

export async function star41() {
  //const input = await getInput(21).then((response) => {
  //let i = response.inputArray;
  // let i = response.inputArray.map(m => m.split(""))

  // let i = [

  // ];

  let srt = { 1: 4, 2: 8 };

  let score1 = 0;
  let score2 = 0;
  let space1 = 7;
  let space2 = 2;
  let turn = 0;
  let roll = 0;
  let count = 0;
  while (score1 < 21 && score2 < 21) {
    if (turn == 0) {
      let increase = ++roll + ++roll + ++roll;
      space1 = (space1 + increase) % 10;
      if (space1 == 0) {
        space1 = 10;
      }
      score1 += space1;
      turn++;
    } else if (turn == 1) {
      let increase = ++roll + ++roll + ++roll;
      space2 = (space2 + increase) % 10;
      if (space2 == 0) {
        space2 = 10;
      }
      score2 += space2;
      turn--;
    }
    console.log({ score1, score2 });
    count += 3;
  }
  if (score1 < 1000) {
    console.log(score1 * count);
  }
  if (score2 < 1000) {
    console.log(score2 * count);
  }

  let answer = 0;
  console.log(`star41: ${answer}`);
  //});
}

export async function star42() {
  //const input = await getInput(21).then((response) => {
  //let i = response.inputArray;
  // let i = response.inputArray.map(m => m.split(""))

  // let i = [

  // ];

  let universes1 = [];
  let universes2 = [];
  for (let a = 0; a < 23; a++) {
    let positions = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let positions2 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    universes1.push(positions);
    universes2.push(positions2);
  }

  universes1[0][4] = 1;
  universes2[0][8] = 1;

  let score_position_combos = {};

  let takeTurn = (turnUniverses, nonTurnUniverses) => {
    let newTurnUniverses = Array.from(Array(23), () => Array(11).fill(0));
    nonTurnUniverses = nonTurnUniverses.map((score) =>
      score.map((position) => (position *= 27))
    );

    let rollTotals = [
      [3, 1],
      [4, 3],
      [5, 6],
      [6, 7],
      [7, 6],
      [8, 3],
      [9, 1],
    ];

    rollTotals.forEach((rt) => {
      turnUniverses.forEach((score, scoreValue) => {
        if (scoreValue < 21) {
          // only scoreValues < 21 are games still being played
          score.forEach((position, positionIndex) => {
            if (positionIndex > 0) {
              let newPositionIndex = (positionIndex + rt[0]) % 10;
              if (newPositionIndex == 0) newPositionIndex = 10;
              let newScore = scoreValue + newPositionIndex;
              if (newScore >= 21) newScore = 21;
              newTurnUniverses[newScore][newPositionIndex] +=
                turnUniverses[scoreValue][positionIndex] * rt[1];
            }
          });
        }
      });
    });
    return { universes1: newTurnUniverses, universes2: nonTurnUniverses };
  };

  let turn = 0;
  let winTally = [0, 0];
  let lossTally = [0, 0];

  while (
    _.sum(_.flatMap(universes1.slice(0, 21))) != 0 &&
    _.sum(_.flatMap(universes2.slice(0, 21))) != 0
  ) {
    if (turn++ % 2 == 0) {
      let updatedUniverses = takeTurn(universes1, universes2);
      universes1 = updatedUniverses.universes1;
      universes2 = updatedUniverses.universes2;

      let countOfUniverses1Reaching = _.sum(_.flatMap(universes1.slice(21)));
      console.log({ countOfUniverses1Reaching });

      winTally = [winTally[0] + countOfUniverses1Reaching, winTally[1]];
      lossTally = [lossTally[0], lossTally[1] + countOfUniverses1Reaching];
    } else {
      let updatedUniverses = takeTurn(universes2, universes1);
      universes1 = updatedUniverses.universes1;
      universes2 = updatedUniverses.universes2;

      let countOfUniverses2Reaching = _.sum(_.flatMap(universes2.slice(21)));

      console.log({ countOfUniverses2Reaching });
      winTally = [
        winTally[0],
        winTally[1] + countOfUniverses2Reaching - lossTally[1],
      ];
      lossTally = [
        lossTally[0] + countOfUniverses2Reaching - winTally[0],
        lossTally[1],
      ];
    }

    console.log({ winTally });
    console.log({ lossTally });
    console.log(`tally1: ${winTally[0] - lossTally[0]}`);
    console.log(`tally2: ${winTally[1] - lossTally[1]}`);
    console.log();
  }

  console.log({ winTally });
  console.log({ lossTally });

  let count1 = _.sum(universes1[21]);
  let count2 = _.sum(universes2[21]);

  console.log({ count1 });
  console.log({ count2 });

  console.log();

  console.log(`star41: ${count1 > count2 ? count1 : count2}`);
  //});
}

export async function star42__() {
  let score_position_combinations = {};

  let findWin = (pos1, pos2, score1, score2) => {
    if (score1 >= 21) {
      return [0n, 1n];
    }
    if (score2 >= 21) {
      return [1n, 0n];
    }
    if (score_position_combinations[`${pos1}_${pos2}_${score1}_${score2}`]) {
      return score_position_combinations[`${pos1}_${pos2}_${score1}_${score2}`];
    }

    let totals = [0n, 0n];
    for (let roll1 = 1; roll1 < 4; roll1++) {
      for (let roll2 = 1; roll2 < 4; roll2++) {
        for (let roll3 = 1; roll3 < 4; roll3++) {
          let newPosition = (pos1 + roll1 + roll2 + roll3) % 10;
          if (newPosition == 0) newPosition = 10;
          let newScore = score1 + newPosition;

          let recursiveTotal = findWin(pos2, newPosition, score2, newScore);
          totals = [
            totals[0] + recursiveTotal[1],
            totals[1] + recursiveTotal[0],
          ];
        }
      }
    }
    score_position_combinations[`${pos1}_${pos2}_${score1}_${score2}`] = totals;
    return totals;
  };

  let universeTally = findWin(1, 5, 0, 0);
  console.log(
    `star42: ${
      universeTally[0] > universeTally[1] ? universeTally[0] : universeTally[1]
    }`
  );
}
