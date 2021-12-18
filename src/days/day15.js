import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";

export async function star29() {
  const input = await getInput(15).then((response) => {
    //let i = response.inputArray;

    // let i = [
    //   "1163751742",
    //   "1381373672",
    //   "2136511328",
    //   "3694931569",
    //   "7463417111",
    //   "1319128137",
    //   "1359912421",
    //   "3125421639",
    //   "1293138521",
    //   "2311944581",
    // ];

    let i = ["191119", "111919", "999119", "991199", "991999", "991111"];

    let array = i.map((m) => m.split("").map((n) => parseInt(n)));

    let increaseLine = (lineArray) => {
      lineArray.map((m) => {
        return ++m > 9 ? 1 : m;
      });

      return increasedLine;
    };

    console.log(array);

    //let minRisk = 1116;

    let minRisk = [{ x: 0, y: 0, risk: 0 }];

    for (let iterations = 0; iterations < 10; iterations++)
      for (let y = 0; y < array.length; y++) {
        for (let x = 0; x < array.length; x++) {
          let riskFromAbove =
            minRisk.find((f) => f.x == x && f.y == y - 1) != undefined
              ? minRisk.find((f) => f.x == x && f.y == y - 1).risk
              : 1000000;
          let riskFromLeft =
            minRisk.find((f) => f.x == x - 1 && f.y == y) != undefined
              ? minRisk.find((f) => f.x == x - 1 && f.y == y).risk
              : 1000000;
          let riskFromRight =
            minRisk.find((f) => f.x == x + 1 && f.y == y) != undefined
              ? minRisk.find((f) => f.x == x + 1 && f.y == y).risk
              : 1000000;
          let riskFromBelow =
            minRisk.find((f) => f.x == x && f.y == y + 1) != undefined
              ? minRisk.find((f) => f.x == x && f.y == y + 1).risk
              : 1000000;

          console.log({ x, y });
          console.log({ riskFromAbove });
          console.log({ riskFromLeft });
          console.log({ riskFromRight });
          console.log({ riskFromBelow });

          let thisMin = Math.min(
            riskFromAbove,
            riskFromLeft,
            riskFromRight,
            riskFromBelow
          );
          console.log({ thisMin });
          if (x == 0 && y == 0) {
            continue;
          }

          let thisMinRisk = minRisk.find((f) => f.x == x && f.y == y);
          console.log({ thisMinRisk });
          if (thisMinRisk === undefined) {
            minRisk.push({
              x,
              y,
              risk: thisMin + array[y][x],
            });
            console.log(`risk: ${thisMin + array[y][x]}`);
          } else {
            thisMinRisk.risk = thisMin + array[y][x];
          }
        }
      }

    console.log(
      minRisk.find((f) => f.x == array.length - 1 && f.y == array.length - 1)
        .risk
    );

    console.log(minRisk);

    let answer = 0;
    console.log(`star29: ${answer}`);
  });
}

export async function star30() {
  const input = await getInput(15).then((response) => {
    let i = response.inputArray;

    // let i = [
    //   "1163751742",
    //   "1381373672",
    //   "2136511328",
    //   "3694931569",
    //   "7463417111",
    //   "1319128137",
    //   "1359912421",
    //   "3125421639",
    //   "1293138521",
    //   "2311944581",
    // ];

    //let i = ["191119", "111919", "999119", "991199", "991999", "991111"];

    let array = i.map((m) => m.split("").map((n) => parseInt(n)));

    let increaseLine = (lineArray) => {
      return lineArray.map((m) => {
        return ++m > 9 ? 1 : m;
      });
    };

    array = array.map((line) => {
      let newLine = increaseLine(line);
      //console.log({ newLine });
      let growingLine = line.concat(newLine);
      //console.log({ growingLine });
      newLine = increaseLine(newLine);
      //console.log({ newLine });
      growingLine = growingLine.concat(newLine);
      //console.log({ growingLine });
      newLine = increaseLine(newLine);
      //console.log({ newLine });
      growingLine = growingLine.concat(newLine);
      //console.log({ growingLine });
      newLine = increaseLine(newLine);
      //console.log({ newLine });
      growingLine = growingLine.concat(newLine);
      //console.log({ growingLine });
      return growingLine;
    });

    console.log(array[0]);

    let increasedArray = [];
    array.forEach((fe) => {
      increasedArray.push(increaseLine(fe));
    });

    let increasedArray2 = [];
    increasedArray.forEach((fe) => {
      increasedArray2.push(increaseLine(fe));
    });

    let increasedArray3 = [];
    increasedArray2.forEach((fe) => {
      increasedArray3.push(increaseLine(fe));
    });

    let increasedArray4 = [];
    increasedArray3.forEach((fe) => {
      increasedArray4.push(increaseLine(fe));
    });

    let growingArray = array.concat(
      increasedArray,
      increasedArray2,
      increasedArray3,
      increasedArray4
    );

    //console.log(growingArray[0][100]);

    let minRisk = [{ x: 0, y: 0, risk: 0 }];

    let maxIter = 200;

    let prevLocalMin = 0;

    for (let iterations = 1; iterations < maxIter; iterations++) {
      console.log({ iterations });
      let iterationSize = Math.floor(growingArray.length / (maxIter - 1));

      let localMax = Math.floor(
        (iterations * growingArray.length) / (maxIter - 1)
      );
      let localMin =
        localMax - 3 * iterationSize >= 0 ? localMax - 3 * iterationSize : 0;
      console.log({ localMin });
      console.log({ localMax });
      for (let y = localMin; y < localMax; y++) {
        for (let x = 0; x < growingArray.length; x++) {
          minRisk = minRisk.filter(
            (f) => f.y > localMin - 10 || (f.x == 0 && f.y == 0)
          );
          let riskFromAbove =
            minRisk.find((f) => f.x == x && f.y == y - 1) != undefined
              ? minRisk.find((f) => f.x == x && f.y == y - 1).risk
              : 1000000;
          let riskFromLeft =
            minRisk.find((f) => f.x == x - 1 && f.y == y) != undefined
              ? minRisk.find((f) => f.x == x - 1 && f.y == y).risk
              : 1000000;
          let riskFromRight =
            minRisk.find((f) => f.x == x + 1 && f.y == y) != undefined
              ? minRisk.find((f) => f.x == x + 1 && f.y == y).risk
              : 1000000;
          let riskFromBelow =
            minRisk.find((f) => f.x == x && f.y == y + 1) != undefined
              ? minRisk.find((f) => f.x == x && f.y == y + 1).risk
              : 1000000;

          //console.log({ x, y });
          //   console.log({ riskFromAbove });
          //   console.log({ riskFromLeft });
          //   console.log({ riskFromRight });
          //   console.log({ riskFromBelow });

          let thisMin = Math.min(
            riskFromAbove,
            riskFromLeft,
            riskFromRight,
            riskFromBelow
          );
          //console.log({ thisMin });
          if (x == 0 && y == 0) {
            continue;
          }

          let thisMinRisk = minRisk.find((f) => f.x == x && f.y == y);
          //console.log({ thisMinRisk });
          if (thisMinRisk === undefined) {
            minRisk.push({
              x,
              y,
              risk: thisMin + growingArray[y][x],
            });
            //console.log(`risk: ${thisMin + growingArray[y][x]}`);
            console.log(minRisk.length);
          } else {
            thisMinRisk.risk = thisMin + growingArray[y][x];
          }
        }
      }
    }

    // for (let y = 0; y < growingArray.length; y++) {
    //   minRisk = minRisk.filter((f) => f.y > y - 2);
    //   for (let x = 0; x < growingArray.length; x++) {
    //     if (x == 0 && y == 0) {
    //       continue;
    //     }
    //     if (y == 0) {
    //       minRisk.push({
    //         x,
    //         y,
    //         risk:
    //           minRisk.find((f) => f.x == x - 1 && f.y == y).risk +
    //           growingArray[y][x],
    //       });
    //     }
    //     if (x == 0) {
    //       minRisk.push({
    //         x,
    //         y,
    //         risk:
    //           minRisk.find((f) => f.y == y - 1 && f.x == x).risk +
    //           growingArray[y][x],
    //       });
    //     }
    //     if (x > 0 && y > 0) {
    //       let riskFromAbove = minRisk.find(
    //         (f) => f.y == y - 1 && f.x == x
    //       ).risk;
    //       let riskFromLeft = minRisk.find((f) => f.x == x - 1 && f.y == y).risk;

    //       minRisk.push({
    //         x,
    //         y,
    //         risk:
    //           riskFromAbove <= riskFromLeft
    //             ? riskFromAbove + growingArray[y][x]
    //             : riskFromLeft + growingArray[y][x],
    //       });
    //     }
    //   }
    // }

    //console.log(minRisk);

    //console.log(minRisk.find((f) => f.y == 0));
    console.log(
      minRisk.find(
        (f) => f.x == growingArray.length - 1 && f.y == growingArray.length - 1
      ).risk
    );

    let answer = 0;
    console.log(`star30: ${answer}`);
  });
}
