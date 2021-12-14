import { getInput } from "../getInput.js";
import _ from "lodash";

export async function star11() {
  const input = await getInput(6).then((response) => {
    //let inputArray = [3, 4, 3, 1, 2];  //testArray

    let inputArray = response.inputArray[0].split(",").map((m) => parseInt(m));
    console.log(inputArray);

    for (let a = 0; a < 256; a++) {
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
    }
    const answer = inputArray.length;
    console.log(`star11: ${answer}`);
  });
}

export async function star12() {
  await getInput(6).then((response) => {
    let i = response.inputArray[0].split(",").map((m) => parseInt(m));
    const g = _.groupBy(i);
    const f = [0].concat(
      Object.values(g).map((m) => m.length),
      [0, 0, 0]
    );
    for (let a = 0; a < 256; a++) {
      f.push(f[0]);
      f.shift();
      f[6] += f[8];
    }
    console.log(`star12: ${_.sum(f)}`);
  });
}
