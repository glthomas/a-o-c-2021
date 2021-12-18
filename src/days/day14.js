import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";

export async function star27() {
  const input = await getInput(14).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let poly = i[0];
    let rules = i.slice(2, i.length).map((m) => m.split(" -> "));

    let genPairs = (str) => {
      let pairs = [];
      for (let a = 0; a < str.length - 1; a++) {
        pairs.push(str.substring(a, a + 2));
      }
      return pairs;
    };

    let pairs = genPairs(poly);

    let genInsertions = (pairs) => {
      let ins = [];
      pairs.forEach((pair) => {
        let rule = rules.find((f) => f[0] == pair);
        if (rule) {
          let splice = [pair.slice(0, 1), rule[1], pair.slice(1)].join("");
          ins.push(splice);
        } else {
          ins.push(pair);
        }
      });
      return ins;
    };

    let chain = (insertions) => {
      let str = "";
      insertions.forEach((ins) => {
        str += ins.substring(0, ins.length - 1);
      });
      str += insertions[insertions.length - 1].charAt(2);
      return str;
    };

    for (let a = 0; a < 10; a++) {
      let pairs = genPairs(poly);
      let insertions = genInsertions(pairs);
      let strChain = chain(insertions);
      poly = strChain;
    }

    let chainArray = poly.split("");
    let groupBy = _.countBy(chainArray);

    console.log(`star27: ${Math.max(...groupBy) - Math.min(...groupBy)}`);
  });
}

export async function star28() {
  const input = await getInput(14).then((response) => {
    let i = response.inputArray;

    let poly = i[0];
    let rules = i.slice(2, i.length).map((m) => m.split(" -> "));
    const rulesDict = new Map(rules.map(([k, v]) => [k, [k[0] + v, v + k[1]]]));

    let keys = Array.from(rulesDict.keys());
    let vals = Array.from(rulesDict.values());

    let pairs = poly.match(/.{2}/g).concat(poly.substring(1).match(/.{2}/g));

    let totals = new Map(
      keys.map((key) => [key, pairs.filter((f) => f == key).length])
    );

    console.log(totals);

    for (let a = 0; a < 40; a++) {
      let newDict = { ...totals };
      let newKeys = Object.keys(newDict);

      newKeys.forEach((nk) => {
        newDict[rulesDict.get(nk)[0]] += totals[nk];
        newDict[rulesDict.get(nk)[1]] += totals[nk];
        if (totals[nk] > 0) newDict[nk] -= totals[nk];
      });
      totals = newDict;
    }

    let charArray = Object.keys(totals).map((m) => m.split(""));
    let distinctChars = Array.from(new Set(_.flatMap(charArray)));

    let charDict = {};
    distinctChars.forEach((ch) => {
      charDict[ch] = 0;
    });

    for (let a = 0; a < charArray.length; a++) {
      charDict[Object.keys(totals)[a][0]] += Object.values(totals)[a];
      charDict[Object.keys(totals)[a][1]] += Object.values(totals)[a];
    }

    // let totals = distinctChars.map((m) => {
    //   return Math.floor((charDict[m] + 1) / 2);
    // });

    //console.log(`star28: ${Math.max(...totals) - Math.min(...totals)}`);
  });
}
