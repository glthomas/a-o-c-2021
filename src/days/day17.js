import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";
import { parse } from "dotenv";

export async function star33() {
  const input = await getInput(17).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    let isInTarget = (x, y) => {
      return x >= 111 && x <= 161 && y <= -101 && y >= -154;
    };

    let hy = 0;
    for (let ix = 14; ix < 15; ix++) {
      for (let iy = 0; iy < 200; iy++) {
        let local = 0;
        let inT = false;
        x = 0;
        y = 0;
        vy = iy;
        vx = ix;
        for (let step = 0; step < 1000; step++) {
          x = x + vx;
          y = y + vy;

          if (isInTarget(x, y)) {
            inT = true;
          }
          if (y > local) {
            local = y;
          }
          console.log({ inT, hy, local, ix, iy, x, y });
          vx -= vx > 0 ? 1 : 0;
          vy = vy - 1;
          if (x > 161 || y < -154) {
            step = 1000;
          }
        }
        if (inT) {
          if (local > hy) {
            hy = local;
          }
        }
      }
    }

    let answer = hy;
    console.log(`star33: ${answer}`);
  });
}

export async function star34() {
  const input = await getInput(17).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let x = 0;
    let y = 0;
    let vx = 0;
    let vy = 0;

    let count = new Map();
    let counter = 0;
    let iv = [];

    let isInTarget = (x, y, ix, iy) => {
      return x > 110 && x < 162 && y < -100 && y > -155;
      //return x >= 20 && x <= 30 && y <= -5 && y >= -10;
    };

    let hy = -1000;
    for (let ix = 15; ix < 162; ix++) {
      for (let iy = -155; iy < 2000; iy++) {
        let local = -1000;
        let inT = false;
        x = 0;
        y = 0;
        vy = iy;
        vx = ix;
        // console.log(iy);
        // console.log(ix);

        for (let step = 0; step < 1000; step++) {
          x = x + vx;
          y = y + vy;

          if (isInTarget(x, y, ix, iy)) {
            if (iv.find((f) => f.x == ix && f.y == iy) == undefined) {
              iv.push({ x: ix, y: iy });
              counter++;
              console.log({ inT, counter, ix, iy, x, y });
              inT = true;
            }
          }
          if (y > local) {
            local = y;
          }

          vx -= vx > 0 ? 1 : 0;
          vy = vy - 1;
          if (x > 161 || y < -154) {
            step = 10000;
          }
        }
        if (inT) {
          if (local > hy) {
            hy = local;
          }
        }
      }
    }

    let answer = hy;
    console.log(`star33: ${answer}`);
  });
}
