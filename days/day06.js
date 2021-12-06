import { getInput } from "../getInput.js";
import _ from "lodash";

export async function star11() {
  const input = await getInput(6).then((response) => {
    console.log("response");
    console.log(response);

    //let inputArray = [3, 4, 3, 1, 2];

    let inputArray = response.inputArray[0].split(",").map((m) => parseInt(m));
    console.log(inputArray);

    for (let a = 0; a < 256; a++) {
      console.log(`day: ${a}`);
      const newFish = [];
      for (let b = 0; b < inputArray.length; b++) {
        if (inputArray[b] > 0) {
          inputArray[b] = inputArray[b] - 1;
        } else {
          inputArray[b] = 6;
          newFish.push(8);
        }
      }
      inputArray = inputArray.concat(newFish);
      console.log(inputArray.length);
    }

    const answer = _.sum(inputArray);

    console.log(`star11: ${answer}`);
  });
}

export async function star12() {
  const input = await getInput(6).then((response) => {
    let inputArray = response.inputArray[0].split(",").map((m) => parseInt(m));

    const groupBy = _.groupBy(inputArray);
    const vals = Object.values(groupBy).map((m) => m.length);

    let f = [0].concat(vals, [0, 0, 0]);

    for (let a = 0; a < 256; a++) {
      const n = [];
      n.push(f[1]);
      n.push(f[2]);
      n.push(f[3]);
      n.push(f[4]);
      n.push(f[5]);
      n.push(f[6]);
      n.push(f[7] + f[0]);
      n.push(f[8]);
      n.push(f[0]);

      f = n;
    }
    const sumOfFish = _.sum(f);
    console.log(`star12: ${sumOfFish}`);
  });
}
