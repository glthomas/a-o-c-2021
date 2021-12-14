import { getInput } from "../getInput.js";
import _ from "lodash";

export async function star13() {
  const input = await getInput(7).then((response) => {
    //console.log(response.inputArray);
    //console.log(response);

    //let inputArray = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]; //testArray
    let i = response.inputArray[0].split(",").map((m) => parseInt(m));
    //let i = response.inputArray;
    console.log(i);

    var median = function (array) {
      array = array.sort((a, b) => a - b);
      console.log(array);
      if (array.length % 2 === 0) {
        // array with even number elements
        return (array[array.length / 2] + array[array.length / 2 - 1]) / 2.0;
      } else {
        return array[(array.length - 1) / 2]; // array with odd number elements
      }
    };

    console.log(median(i) * i.length);

    let b = [];
    for (let a = 0; a < 1000; a++) {
      const diff = i.map((m) => Math.abs(m - a));
      b.push(_.sum(diff));
      //console.log(_.sum(diff));
    }

    console.log(`min: ${_.min(b)}`);

    const answer = "?";
    console.log(`star13: ${answer}`);
  });
}

export async function star14() {
  const input = await getInput(7).then((response) => {
    let i = response.inputArray[0].split(",").map((m) => parseInt(m));
    let b = [];
    for (let a = 0; a < _.max(i); a++) {
      const diff = i.map((m) => _.sum(_.range(1, Math.abs(m - a) + 1)));
      b.push(_.sum(diff));
    }
    console.log(`star14: ${_.min(b)}`);
  });
}
