import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";

export async function star1() {
  const input = await getInput(1).then((response) => {
    let i = response.inputArray;

    //console.log(i);

    let depthIncreases = 0;

    console.log(i.length);

    for (let a = 1; a < 2000; a++) {
      if (parseInt(i[a]) > parseInt(i[a - 1])) {
        depthIncreases = depthIncreases + 1;
      }
    }

    console.log({ depthIncreases });

    //let answer = 0;
    //console.log(`star22: ${answer}`);
  });
}
