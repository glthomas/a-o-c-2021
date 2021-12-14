import { getInput as g } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";
import { parse } from "dotenv";
import fs from "fs";

const config = {};
const math = create(all, config);

export async function star25() {
  const input = await g(13).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let dots = i.slice(0, i.length - 13);
    // let dots = i;
    dots = dots.map((m) => m.split(",").map((n) => parseInt(n)));

    console.log({ dots });

    let genXDict = (dots) => {
      let xd = {};
      dots.forEach((coord) => {
        xd[coord[0]] = dots
          .filter((xy) => xy[0] == coord[0])
          .map((m) => parseInt(m[1]));
      });
      return xd;
    };

    let genYDict = (dots) => {
      let yd = {};
      dots.forEach((coord) => {
        yd[coord[1]] = dots
          .filter((xy) => xy[1] == coord[1])
          .map((m) => parseInt(m[0]));
      });
      return yd;
    };

    let xDict = genXDict(dots);
    let yDict = genYDict(dots);

    //xfold
    let xfold = (yDict, foldLine) => {
      let maxY = parseInt(_.last(Object.keys(yDict)));
      let total = 0;
      for (let b = 0; b < maxY + 1; b++) {
        console.log(yDict[b]);
        if (yDict[b]) {
          let newXs = [];
          yDict[b].forEach((x) => {
            if (x < foldLine) {
              newXs.push(x);
            } else if (x > foldLine) {
              newXs.push(2 * foldLine - x);
            }
          });
          //console.log({ newXs });
          yDict[b] = Array.from(new Set(newXs));
          //console.log(yDict[b]);
          total += yDict[b].length;
        }
      }
      console.log(total);
      return yDict;
    };

    let genNewDotsFromYDict = (yDict) => {
      let newDots = [];
      Object.keys(yDict).forEach((y) => {
        yDict[y].forEach((x) => {
          newDots.push(x, y);
        });
      });
      return newDots;
    };

    let genNewDotsFromXDict = (xDict) => {
      let newDots = [];
      Object.keys(xDict).forEach((x) => {
        xDict[x].forEach((y) => {
          newDots.push(x, y);
        });
      });
      return newDots;
    };

    let yfold = (xDict, foldLine) => {
      let maxX = parseInt(_.last(Object.keys(xDict)));
      let total = 0;
      for (let b = 0; b < maxX + 1; b++) {
        console.log(xDict[b]);
        if (xDict[b]) {
          let newYs = [];
          xDict[b].forEach((y) => {
            if (y < foldLine) {
              newYs.push(y);
            } else if (y > foldLine) {
              newYs.push(2 * foldLine - y);
            }
          });

          xDict[b] = Array.from(new Set(newYs));

          total += xDict[b].length;
        }
      }
      console.log(total);
      return xDict;
    };

    yDict = xfold(yDict, 655);
    dots = genNewDotsFromYDict(yDict);
    xDict = genXDict(dots);

    xDict = yfold(xDict, 447);
    dots = genNewDotsFromXDict(xDict);
    console.log(dots);
    // yDict = genYDict(dots);

    // yDict = xfold(yDict, 327);
    // dots = genNewDotsFromYDict(yDict);
    // xDict = genXDict(dots);

    // xDict = yfold(xDict, 223);
    // dots = genNewDotsFromXDict(xDict);
    // yDict = genYDict(dots);

    // yDict = xfold(yDict, 163);
    // dots = genNewDotsFromYDict(yDict);
    // xDict = genXDict(dots);

    // xDict = yfold(xDict, 111);
    // dots = genNewDotsFromXDict(xDict);
    // yDict = genYDict(dots);

    // yDict = xfold(yDict, 81);
    // dots = genNewDotsFromYDict(yDict);
    // xDict = genXDict(dots);

    // xDict = yfold(xDict, 55);
    // dots = genNewDotsFromXDict(xDict);
    // yDict = genYDict(dots);

    // yDict = xfold(yDict, 40);
    // dots = genNewDotsFromYDict(yDict);
    // xDict = genXDict(dots);

    // xDict = yfold(xDict, 27);
    // dots = genNewDotsFromXDict(xDict);
    // yDict = genYDict(dots);

    // xDict = yfold(xDict, 13);
    // dots = genNewDotsFromXDict(xDict);
    // yDict = genYDict(dots);

    // xDict = yfold(xDict, 6);
    // dots = genNewDotsFromXDict(xDict);
    // yDict = genYDict(dots);

    // console.log(xDict);

    // let answer = 0;
    // console.log(`star25: ${0}`);
  });
}

// export async function s26() {
//   const j = await g(13).then((r) => {
//     let i = r.ia;
//     let z = i.slice(0, i.length - 13);
//     z = z.map((m) => m.split(",").map((n) => parseInt(n)));

//     let f = (q, l, x) =>
//       q.map((d) => [
//         x ? (d[0] > l ? 2 * l - d[0] : d[0]) : d[0],
//         x ? d[1] : d[1] > l ? 2 * l - d[1] : d[1],
//       ]);

//     let l = i.slice(854).map((m) => m.split(" ")[2].split("="));

//     //print
//     let p = (d) => {
//       for (let y = 0; y < 7; y++) {
//         let w = "";
//         for (let x = 0; x < 40; x++) {
//           w += d.some((d) => d[0] == x && d[1] == y) ? "#" : " ";
//         }
//         console.log(w);
//       }
//     };

//     for (let a = 0; a < l.length; a++) {
//       z = f(z, parseInt(l[a][1]), l[a][0] == "x");
//       p(z);
//     }
//   });
// }

export async function s26() {
  await g(13).then((t) => {
    let e = t.ia,
      l = e.slice(0, e.length - 13);
    l = l.map((t) => t.split(",").map((t) => parseInt(t)));
    let s = (t, e, l) =>
        t.map((t) => [
          l && t[0] > e ? 2 * e - t[0] : t[0],
          l ? t[1] : t[1] > e ? 2 * e - t[1] : t[1],
        ]),
      a = e.slice(854).map((t) => t.split(" ")[2].split("=")),
      p = (t) => {
        for (let e = 0; e < 7; e++) {
          let l = "";
          for (let s = 0; s < 40; s++)
            l += t.some((t) => t[0] == s && t[1] == e) ? "#" : " ";
          console.log(l);
        }
      };
    for (let t = 0; t < a.length; t++)
      p((l = s(l, parseInt(a[t][1]), "x" == a[t][0])));
  });
}
