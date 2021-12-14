import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export async function star15() {
  const input = await getInput(8).then((response) => {
    let i = response.inputArray;
    let ios = i.map((m) => m.split(" | "));
    let outputs = ios.map((m) => m[1].split(" "));

    let ones = 0;
    let fours = 0;
    let sev = 0;
    let eights = 0;

    for (let a = 0; a < outputs.length; a++) {
      ones += outputs[a].filter((s) => s.length === 2).length;
      fours += outputs[a].filter((s) => s.length === 4).length;
      sev += outputs[a].filter((s) => s.length === 3).length;
      eights += outputs[a].filter((s) => s.length === 7).length;
    }
    console.log(`star15: ${ones + fours + sev + eights}`);
  });
}

export async function star16() {
  const input = await getInput(8).then((response) => {
    let i = response.inputArray;
    let ios = i.map((m) => m.split(" | "));
    console.log(ios);

    let outputs = ios.map((m) => m[1].split(" "));
    let inputs = ios.map((m) => m[0].split(" "));

    let ones = 0;
    let fours = 0;
    let sev = 0;
    let eights = 0;

    // This is because I suck at dynamic regex
    let matcher = function (word1, subWord) {
      console.log({ word1 });
      console.log({ subWord });
      let subWordSplit = subWord.split("");
      console.log({ subWordSplit });
      let matches = 0;
      subWordSplit.forEach((ch) => {
        if (word1.includes(ch)) {
          matches++;
        }
      });
      return matches;
    };

    let total = 0;
    for (let a = 0; a < outputs.length; a++) {
      let num = "";
      let z1 = inputs[a].filter((f) => f.length == 2)[0];
      let z4 = inputs[a].filter((f) => f.length == 4)[0];
      let z7 = inputs[a].filter((f) => f.length == 3)[0];
      let z8 = inputs[a].filter((f) => f.length == 7)[0];
      let z235 = inputs[a].filter((f) => f.length == 5);
      let z069 = inputs[a].filter((f) => f.length == 6);
      let z2;
      let z3;
      let z5;
      let z25 = [];

      // 0,2,3,5,6,9 need to use mask checking,
      // maybe there exists a clever way using byte mask operations
      // for now here is the naive approach
      if (matcher(z235[0], z1) == 2) {
        z3 = z235[0];
        z25.push(z235[1]);
        z25.push(z235[2]);
      } else if (matcher(z235[1], z1) == 2) {
        z3 = z235[1];
        z25.push(z235[0]);
        z25.push(z235[2]);
      } else if (matcher(z235[2], z1) == 2) {
        z3 = z235[2];
        z25.push(z235[0]);
        z25.push(z235[1]);
      }

      z3 = z235.find(f => matcher(f,z1)==2)
      z25 = z235.find((f) => matcher(f, z1) != 2);



      if (matcher(z25[0], z4) == 2) {
        z2 = z25[0];
        z5 = z25[1];
      } else {
        z2 = z25[1];
        z5 = z25[0];
      }

      let z0;
      let z6;
      let z9;

      let z09 = [];

      if (matcher(z069[0], z1) == 1) {
        z6 = z069[0];
        z09.push(z069[1]);
        z09.push(z069[2]);
      } else if (matcher(z069[1], z1) == 1) {
        z6 = z069[1];
        z09.push(z069[0]);
        z09.push(z069[2]);
      }
      if (matcher(z069[2], z1) == 1) {
        z6 = z069[2];
        z09.push(z069[0]);
        z09.push(z069[1]);
      }

      if (matcher(z09[0], z5) === 5) {
        z9 = z09[0];
        z0 = z09[1];
      } else {
        z9 = z09[1];
        z0 = z09[0];
      }

      // now that segments that make up 0 thru 9 are known it's just a matter of doing output matching.
      // again homework for me is to improve this with dynamic regex matching or clever byte mask matching
      let outWord = outputs[a];
      console.log({ outWord });
      for (let b = 0; b < 4; b++) {
        // need to check in decreasing order of segements needed to avoid false positive matches
        if (matcher(outWord[b], z8) == 7) {
          num += "8";
        } else if (matcher(outWord[b], z6) == 6) {
          num += "6";
        } else if (matcher(outWord[b], z9) == 6) {
          num += "9";
        } else if (matcher(outWord[b], z0) == 6) {
          num += "0";
        } else if (matcher(outWord[b], z2) == 5) {
          num += "2";
        } else if (matcher(outWord[b], z3) == 5) {
          num += "3";
        } else if (matcher(outWord[b], z5) == 5) {
          num += "5";
        } else if (matcher(outWord[b], z4) == 4) {
          num += "4";
        } else if (matcher(outWord[b], z7) == 3) {
          num += "7";
        } else if (matcher(outWord[b], z1) == 2) {
          console.log("matched");
          num += "1";
        }
      }
      total += parseInt(num);
    }

    console.log(`star16: ${total}`);
  });
}
