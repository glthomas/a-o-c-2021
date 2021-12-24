import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";
import { parse } from "dotenv";

const config = {};
const math = create(all, config);

export async function star39() {
  const input = await getInput(20).then((response) => {
    let i = response.inputArray;

    // let padSize = 30;

    // let i = [
    //   "..#.#..#####.#.#.#.###.##.....###.##.#..###.####..#####..#....#..#..##..###..######.###...####..#..#####..##..#.#####...##.#.#..#.##..#.#......#.###.######.###.####...#.##.##..#..#..#####.....#.#....###..#.##......#.....#..#..#..##..#...##.######.####.####.#.#...#.......#..#.#.#...####.##.#......#..#...##.#.##..#...##.#.##..###.#......#.#.......#.#.#.####.###.##...#.....####.#..#..#.##.#....##..#.####....##...##..#...#......#.#.......#.......##..####..#...#.#.#...##..#.#..###..#####........#..####......#..#",
    //   "",
    //   "#..#.",
    //   "#....",
    //   "##..#",
    //   "..#..",
    //   "..###",
    // ];

    //console.log(i);
    console.log(i[0]);
    console.log(i[1]);
    console.log(i[2]);

    let j = i.slice(2, i.length);

    console.log(j);

    // let k = j.length + padSize;
    // j = j.map((m) => m.padStart(k, ".").padEnd(k + padSize, "."));

    // console.log(j);

    // const jlen = j.length;

    // for (let g = 0; g < padSize; g++) {
    //   j.unshift(".".repeat(2 * padSize + jlen));
    //   j.push(".".repeat(2 * padSize + jlen));
    // }

    console.log(j);

    // let read = (j, x, y) => {
    //   return parseInt(
    //     (
    //       j[y - 1].substring(x - 1, x + 2) +
    //       j[y].substring(x - 1, x + 2) +
    //       j[y + 1].substring(x - 1, x + 2)
    //     )
    //       .replace(/\#/g, 1)
    //       .replace(/\./g, 0),
    //     2
    //   );
    // };

    let read = (j, x, y, on) => {
      // topLeft
      let tl = on;
      if (y > 0 && x > 0) {
        tl = j[y - 1][x - 1];
      }

      let tt = on;
      if (y > 0) {
        tt = j[y - 1][x];
      }

      let tr = on;
      if (y > 0 && x < j.length - 1) {
        tr = j[y - 1][x + 1];
      }

      let ll = on;
      if (x > 0) {
        ll = j[y][x - 1];
      }

      let rr = on;
      if (x < j.length - 1) {
        rr = j[y][x + 1];
      }

      let bl = on;
      if (y < j.length - 1 && x > 0) {
        bl = j[y + 1][x - 1];
      }

      let bb = on;
      if (y < j.length - 1) {
        bb = j[y + 1][x];
      }

      let br = on;
      if (y < j.length - 1 && x < j.length - 1) {
        br = j[y + 1][x + 1];
      }

      let mm = j[y][x];

      let word = tl + tt + tr + ll + mm + rr + bl + bb + br;

      return parseInt(word.replace(/\#/g, 1).replace(/\./g, 0), 2);
    };

    let trimFat = (j, trimSize) => {
      let trim = [...j];
      let jLen = j[0].length;
      //   console.log(trim);

      trim = trim.map((m) => m.substring(trimSize, jLen - trimSize - 1));
      //   console.log(trim);

      trim = trim.slice(trimSize, jLen - trimSize);
      //   console.log(trim);
      for (let a = 0; a < trimSize; a++) {
        trim.pop();
      }

      //   console.log(trim);
      return trim;
    };

    let addPad = (j, padSize, char) => {
      let pad = [...j];

      let k = j[0].length + padSize;
      //   console.log(pad);
      pad = pad.map((m) => m.padStart(k, char).padEnd(k + padSize, char));
      //   console.log(pad);
      const jlen = pad[0].length;

      for (let g = 0; g < padSize; g++) {
        pad.unshift(char.repeat(jlen));
        pad.push(char.repeat(jlen));
      }

      //   console.log(pad);
      return pad;
    };

    let copy = [...j];
    console.log(copy);

    for (let z = 1; z < 51; z++) {
      console.log({ z });
      j = addPad(j, 10, z % 2 == 0 ? "#" : ".");
      //   console.log(j);
      copy = [...j];
      for (let y = 0; y < copy.length; y++) {
        for (let x = 0; x < copy.length; x++) {
          //console.log(copy[y]);

          //console.log(i[0][read(j, x, y)]);
          copy[y] =
            copy[y].substring(0, x) +
            i[0][read(j, x, y, z % 2 == 0 ? "." : "#")] +
            copy[y].substring(x + 1);
          //console.log(copy[y]);
        }
      }
      //   console.log(copy);
      copy = trimFat(copy, 2);
      //   console.log(copy);
      j = [...copy];
    }

    console.log(copy);

    let trim = copy;

    let count = _.countBy(_.flatMap(trim.map((m) => m.split(""))));

    console.log(trim);

    console.log(count);

    let answer = 0;

    console.log(i.length);
    console.log(`star39: ${answer}`);
  });
}

export async function star40() {
  const input = await getInput(20).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let answer = 0;
    console.log(`star40: ${answer}`);
  });
}
