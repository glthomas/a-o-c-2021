import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";
import { parse } from "dotenv";

const config = {};
const math = create(all, config);

export async function star21() {
  const input = await getInput(11).then((response) => {
    let i = response.inputArray.map((m) => m.split("").map((n) => parseInt(n)));

    // let i = [
    //   "5483143223",
    //   "2745854711",
    //   "5264556173",
    //   "6141336146",
    //   "6357385478",
    //   "4167524645",
    //   "2176841721",
    //   "6882881134",
    //   "4846848554",
    //   "5283751526",
    // ].map((m) => m.split("").map((n) => parseInt(n)));

    // let i = ["11111", "19991", "19191", "19991", "11111"].map((m) =>
    //   m.split("").map((n) => parseInt(n))
    // );

    console.log(i);

    let flashes = 0;
    let flashePerStep = 0;

    let siblings = [
      ["Erik", 1990],
      ["Andrea", 1993],
      ["Paula", 2005],
    ];
    let name = siblings[2][0];
    console.log(name);

    console.log(name);

    for (let c of _.range(1, -2, -1)) {
      for (let d of _.range(1, -2, -1)) {
        console.log({ c, d });
        // if (c !== 0 && d !== 0) {
        //   console.log({ c, d });
        // }
      }
    }

    let flash = (a, b) => {
      if (b - 1 >= 0 && a - 1 >= 0) {
        i[b - 1][a - 1] += i[b - 1][a - 1] != 0 ? 1 : 0;
      }
      if (a - 1 >= 0) {
        i[b][a - 1] += i[b][a - 1] != 0 ? 1 : 0;
      }
      if (b + 1 < i[0].length && a - 1 >= 0) {
        i[b + 1][a - 1] += i[b + 1][a - 1] != 0 ? 1 : 0;
      }
      if (b + 1 < i[0].length) {
        i[b + 1][a] += i[b + 1][a] != 0 ? 1 : 0;
      }
      if (b + 1 < i[0].length && a + 1 < i[0].length) {
        i[b + 1][a + 1] += i[b + 1][a + 1] != 0 ? 1 : 0;
      }
      if (a + 1 < i[0].length) {
        i[b][a + 1] += i[b][a + 1] != 0 ? 1 : 0;
      }
      if (b - 1 >= 0 && a + 1 < i[0].length) {
        i[b - 1][a + 1] += i[b - 1][a + 1] != 0 ? 1 : 0;
      }
      if (b - 1 >= 0) {
        i[b - 1][a] += i[b - 1][a] != 0 ? 1 : 0;
      }
    };

    let affect = (a, b) => {
      if (i[b][a] > 9) {
        flashes++;
        flashePerStep++;
        flash(a, b);
        i[b][a] = 0;
      }
    };

    for (let step = 1; step < 10000; step++) {
      for (let y = 0; y < i[0].length; y++) {
        for (let x = 0; x < i[0].length; x++) {
          i[y][x]++;
        }
      }
      flashePerStep = 0;
      for (let z = 0; z < 10; z++) {
        for (let y = 0; y < i[0].length; y++) {
          for (let x = 0; x < i[0].length; x++) {
            affect(x, y);
          }
        }
      }
      if (flashePerStep == 100) {
        console.log({ step });
        step = 100000000;
      }
    }

    //console.log(i);

    console.log(`star21: ${flashes}`);
  });
}

export async function star22() {
  const input = await getInput(11).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let answer = 0;
    console.log(`star22: ${answer}`);
  });
}
