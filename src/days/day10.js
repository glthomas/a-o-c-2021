import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";

const config = {};
const math = create(all, config);

export async function star19() {
  const input = await getInput(10).then((response) => {
    console.log(response.inputArray);
    console.log(response);

    //let inputArray = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]; //testArray

    let i = response.inputArray.map((m) => m.split(""));

    //let i = response.inputArray;
    console.log(i);

    let close = (ch) => {
      console.log(ch);
      if (ch == "(") return ")";
      if (ch == "[") return "]";
      if (ch == "{") return "}";
      return ">";
    };

    let illegalChars = [];
    let legalClosings = [];
    for (let a = 0; a < i.length; a++) {
      let illegal = false;
      let run = [i[a][0]];

      if ([")", "]", ">", "}"].includes(run)) {
        illegalChars.push(run);
      } else {
        let closing = [close(i[a][0])];
        for (let d = 1; d < i[a].length; d++) {
          if ([")", "]", ">", "}"].includes(i[a][d])) {
            if (
              (i[a][d] == ")" && _.last(run) != "(") ||
              (i[a][d] == "]" && _.last(run) != "[") ||
              (i[a][d] == ">" && _.last(run) != "<") ||
              (i[a][d] == "}" && _.last(run) != "{")
            ) {
              illegalChars.push(i[a][d]);
              illegal = true;
              d = 10000;
            } else {
              run.pop();
              closing.shift();
            }
          } else {
            run.push(i[a][d]);
            closing = [close(i[a][d])].concat(closing);
          }
        }
        if (!illegal) {
          legalClosings.push(closing);
        }
      }
    }
    console.log(legalClosings);

    let boom = (total, num) => {
      return 5 * total + num;
    };

    let scores = legalClosings.map((m) => {
      let mi = m.map((n) => {
        if (n == ")") return 1;
        if (n == "]") return 2;
        if (n == "}") return 3;
        return 4;
      });
      let score = 0;
      for (let h = 0; h < mi.length; h++) {
        score = score * 5 + mi[h];
      }
      console.log(score);
      return score;
      //   console.log({ mi });
      //   return mi.reduce(boom, 0);
    });

    console.log(scores);
    console.log(math.median(scores));

    const answer =
      illegalChars.filter((f) => f == ")").length * 3 +
      illegalChars.filter((f) => f == "]").length * 57 +
      illegalChars.filter((f) => f == "}").length * 1197 +
      illegalChars.filter((f) => f == ">").length * 25137;

    console.log(`star19: ${answer}`);
  });
}

export async function star20() {
  const input = await getInput(10).then((response) => {
    //console.log(response.inputArray);
    //console.log(response);

    //let inputArray = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14]; //testArray

    // let i = [
    //   "2199943210",
    //   "3987894921",
    //   "9856789892",
    //   "8767896789",
    //   "9899965678",
    // ];

    //let i = response.inputArray[0].split(",").map((m) => parseInt(m));

    let i = response.inputArray;
    console.log(i);

    i = i.map((m) => `9${m}9`);
    console.log(i);

    let topAndBottom = "9".repeat(102);
    let first = [topAndBottom];
    i = first.concat(i, first);

    console.log(i);

    console.log(i.length);
    console.log(i[0].length);

    let d2 = i.map((m) => m.split("").map((m) => parseInt(m)));
    //console.log(d2);

    let coordsChecked = [];

    const less = (a) => {
      return a >= 1 ? a - 1 : a;
    };

    const more = (a) => {
      return a <= 101 ? a + 1 : a;
    };

    let checkNeighbors = (x, y, basinId) => {
      if (!coordsChecked.some((coord) => coord.x == x && coord.y == y)) {
        if (d2[y][x] == 9) {
          coordsChecked.push({ x, y, basinId: -1 });
          return 0;
        } else {
          coordsChecked.push({ x, y, basinId });
          return (
            1 +
            checkNeighbors(more(x), y, basinId) +
            checkNeighbors(less(x), y, basinId) +
            checkNeighbors(x, more(y), basinId) +
            checkNeighbors(x, less(y), basinId)
          );
        }
      } else return 0;
    };

    let basins = [];
    let basinId = 0;
    let basinSize = 0;
    for (let y = 1; y < 101; y++) {
      for (let x = 1; x < 101; x++) {
        if (
          !coordsChecked.some((coord) => coord.x == x && coord.y == y) &&
          d2[y][x] != 9
        ) {
          console.log("new coord");
          basinId++;
          basinSize += checkNeighbors(x, y, basinId);
          console.log({ basinId, basinSize });
          basins.push({ basinId, basinSize });
          basinSize = 0;
        }
      }
    }

    let sorted = basins.sort((s, t) => t.basinSize - s.basinSize);
    console.log({ sorted });

    const answer = "?";
    console.log(`star20: ${basins}`);
  });
}
