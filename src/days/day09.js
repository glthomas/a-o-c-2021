import { getInput } from "../getInput.js";
import _ from "lodash";
import { to } from "mathjs";

export async function star17() {
  const input = await getInput(9).then((response) => {
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
    console.log(d2);

    let checkIfLocalMin = (x, y, a) => {
      console.log(a[y][x]);

      return (
        a[y][x] < a[y + 1][x] &&
        a[y][x] < a[y - 1][x] &&
        a[y][x] < a[y][x + 1] &&
        a[y][x] < a[y][x - 1]
      );
    };

    let c = [];
    let g = [];
    let h = 0;
    for (let y = 1; y < d2.length - 1; y++) {
      console.log(`row being checked= ${y}`);
      c.push([]);
      for (let x = 1; x < d2[y].length - 1; x++) {
        console.log(`col being checked= ${x}`);
        console.log(`cell value: ${d2[y][x]}`);
        if (checkIfLocalMin(x, y, d2)) {
          c[y - 1].push(d2[y][x]);
          console.log("local min");
          g.push({ x, y, low: d2[y][x] });
          h += d2[y][x] + 1;
        } else {
          c[y - 1].push(0);
        }
      }
    }

    console.log({ g });

    const answer = "?";
    console.log(`star17: ${h}`);
  });
}

export async function star18() {
  const input = await getInput(9).then((response) => {
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
    //console.log(`star18: ${basins}`);
  });
}
