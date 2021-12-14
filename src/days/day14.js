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

    for (let a = 0; a < 40; a++) {
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

    let rulesDict = {};
    rules.forEach((rule) => {
      rulesDict[rule[0]] = [
        rule[0].charAt(0) + rule[1],
        rule[1] + rule[0].charAt(1),
      ];
    });

    let keys = Object.keys(rulesDict);
    let vals = _.flatMap(Object.values(rulesDict));
    let distinctKeys = Array.from(new Set(keys.concat(vals)));

    let pairTots = {};
    distinctKeys.forEach((dk) => {
      pairTots[dk] = 0;
    });

    let genPairs = (str) => {
      let pairs = [];
      for (let a = 0; a < str.length - 1; a++) {
        pairs.push(str.substring(a, a + 2));
      }
      return pairs;
    };

    let pairs = genPairs(poly);
    pairs.forEach((p) => {
      pairTots[p] += 1;
    });

    for (let a = 0; a < 40; a++) {
      let newDict = { ...pairTots };
      let newKeys = Object.keys(newDict);

      newKeys.forEach((nk) => {
        newDict[rulesDict[nk][0]] += pairTots[nk];
        newDict[rulesDict[nk][1]] += pairTots[nk];
        if (pairTots[nk] > 0) newDict[nk] -= pairTots[nk];
      });
      pairTots = newDict;
    }

    let charArray = Object.keys(pairTots).map((m) => m.split(""));
    let distinctChars = Array.from(new Set(_.flatMap(charArray)));

    let charDict = {};
    distinctChars.forEach((ch) => {
      charDict[ch] = 0;
    });

    for (let a = 0; a < charArray.length; a++) {
      charDict[Object.keys(pairTots)[a][0]] += Object.values(pairTots)[a];
      charDict[Object.keys(pairTots)[a][1]] += Object.values(pairTots)[a];
    }

    let totals = distinctChars.map((m) => {
      return Math.floor((charDict[m] + 1) / 2);
    });

    console.log(`star28: ${Math.max(...totals) - Math.min(...totals)}`);
  });
}
