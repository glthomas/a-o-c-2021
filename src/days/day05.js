import { getInput } from "../getInput.js";
import _ from "lodash";

export async function star9() {
  const input = await getInput(5).then((response) => {
    // console.log("response");
    // console.log(response);

    let x0;
    let y0;
    let x1;
    let y1;
    let dx;
    let dy;
    let m = [];

    const testString = [
      "0,9 -> 5,9",
      "8,0 -> 0,8",
      "9,4 -> 3,4",
      "2,2 -> 2,1",
      "7,0 -> 7,4",
      "6,4 -> 2,0",
      "0,9 -> 2,9",
      "3,4 -> 1,4",
      "0,0 -> 8,8",
      "5,5 -> 8,2",
    ];

    let inputArray = response.inputArray;
    //let inputArray = testString;

    x0 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[0]));
    y0 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[1]));
    x1 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[2]));
    y1 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[3]));

    for (let i = 0; i < x0.length; i++) {
      if (x0[i] === x1[i]) {
        m.push(Infinity);
      } else {
        let rise = y1[i] - y0[i];
        let run = x1[i] - x0[i];
        m.push(rise / (run * 1.0));
      }
    }

    // for each line walk range, and if y is whole number it intersects a vertical and horizontal line at that coordinate

    let crossings = [];

    for (let j = 0; j < m.length; j++) {
      if (m[j] == 0) {
        const xRange = _.range(x0[j], x1[j]);
        xRange.push(x1[j]);

        let yIntercept = y0[j] - m[j] * x0[j];

        xRange.forEach((x) => {
          let thisY = x * m[j] + yIntercept;
          if (Number.isInteger(thisY)) {
            crossings.push([x, thisY]);
          }
        });
      }
      if (m[j] == Infinity) {
        const yRange = _.range(y0[j], y1[j]);
        yRange.push(y1[j]);

        let xIntercept = y0[j] - m[j] * x0[j];

        yRange.forEach((y) => {
          //let thisY = x * m[j] + xIntercept;
          let thisX = x0[j];
          if (Number.isInteger(thisX)) {
            crossings.push([thisX, y]);
          }
        });
      }
    }

    const groupBy = _.groupBy(crossings);

    const keys = Object.keys(groupBy);

    const multipleCrossings = keys.filter((f) => {
      return groupBy[f].length > 1;
    });

    console.log(`star9: ${multipleCrossings.length}`);
  });
}

export async function star10() {
  const input = await getInput(5).then((response) => {
    // console.log("response");
    // console.log(response);

    let x0;
    let y0;
    let x1;
    let y1;
    let m = [];

    const testString = [
      "0,9 -> 5,9",
      "8,0 -> 0,8",
      "9,4 -> 3,4",
      "2,2 -> 2,1",
      "7,0 -> 7,4",
      "6,4 -> 2,0",
      "0,9 -> 2,9",
      "3,4 -> 1,4",
      "0,0 -> 8,8",
      "5,5 -> 8,2",
    ];

    let inputArray = response.inputArray;
    //let inputArray = testString;

    x0 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[0]));
    y0 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[1]));
    x1 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[2]));
    y1 = inputArray.map((m) => parseInt(m.replace(" -> ", ",").split(",")[3]));

    for (let i = 0; i < x0.length; i++) {
      if (x0[i] === x1[i]) {
        m.push(Infinity);
      } else {
        let rise = y1[i] - y0[i];
        let run = x1[i] - x0[i];
        m.push(rise / (run * 1.0));
      }
    }

    // for each line walk range, and if y is whole number it intersects a vertical and horizontal line at that coordinate

    let crossings = [];

    for (let j = 0; j < m.length; j++) {
      if (m[j] !== Infinity) {
        const xRange = _.range(x0[j], x1[j]);
        xRange.push(x1[j]);

        let yIntercept = y0[j] - m[j] * x0[j];

        xRange.forEach((x) => {
          let thisY = x * m[j] + yIntercept;
          if (Number.isInteger(thisY)) {
            crossings.push([x, thisY]);
          }
        });
      }
      if (m[j] == Infinity) {
        const yRange = _.range(y0[j], y1[j]);
        yRange.push(y1[j]);

        yRange.forEach((y) => {
          let thisX = x0[j];
          if (Number.isInteger(thisX)) {
            crossings.push([thisX, y]);
          }
        });
      }
    }

    const groupBy = _.groupBy(crossings);
    const keys = Object.keys(groupBy);
    const multipleCrossings = keys.filter((f) => {
      return groupBy[f].length > 1;
    });

    console.log(`star10: ${multipleCrossings.length}`);
  });
}
