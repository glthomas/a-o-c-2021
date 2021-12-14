import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all, exp } from "mathjs";
import { parse } from "dotenv";

const config = {};
const math = create(all, config);

export async function star23() {
  const input = await getInput(12).then((response) => {
    //let i = response.inputArray.map((m) => m.split("").map((n) => parseInt(n)));

    let i = response.inputArray.map((m) => m.split("-"));

    // let i = [
    //   "fs-end",
    //   "he-DX",
    //   "fs-he",
    //   "start-DX",
    //   "pj-DX",
    //   "end-zg",
    //   "zg-sl",
    //   "zg-pj",
    //   "pj-he",
    //   "RW-he",
    //   "fs-DX",
    //   "pj-RW",
    //   "zg-RW",
    //   "start-pj",
    //   "he-WI",
    //   "zg-he",
    //   "pj-fs",
    //   "start-RW",
    // ].map((m) => m.split("-"));

    let caves = new Set(_.flatten(i));

    console.log(caves);

    let dict = {};
    caves.forEach((c) => {
      dict[c] = i
        .filter((f) => f[0] == c)
        .map((m) => m[1])
        .concat(i.filter((f) => f[1] == c).map((m) => m[0]));
    });

    console.log(dict);

    let isLower = (cave) => {
      return cave[0] == cave[0].toLowerCase();
    };

    let expand = (path, newArray) => {
      return newArray.map((m) => [...path, m]);
    };

    //console.log(expand(["a", "b", "c"], ["d", "e", "f", "g"]));

    let walk = (path) => {
      let tail = path[path.length - 1];
      let newBranches = dict[tail];
      let expanded = expand(path, newBranches);
      expanded = expanded.filter((p) => {
        const smallCaves = p.filter((s) => isLower(s));
        const set = Array.from(new Set(smallCaves));
        if (
          (set.length == smallCaves.length ||
            set.length + 1 == smallCaves.length) &&
          p.filter((f) => f == "end").length < 2
        ) {
          return true;
        }
      });
      console.log({ expanded });
      return expanded;
    };

    // let walk = (paths) => {
    //   console.log({ paths });
    //   let growingPaths = [];
    //   paths.forEach((path) => {
    //     // path example ['start', 'A']
    //     dict[path[path.length - 1]].forEach((cave) => {
    //       let pathClone = [...path];
    //       console.log({ cave });
    //       pathClone.push(cave);
    //       console.log({ pathClone });
    //       if (isLower(cave)) {
    //         if (!pathClone.includes(cave)) {
    //           console.log("deep in");
    //           console.log(paths);
    //           console.log("about to walk further");
    //           growingPaths.concat(walk([pathClone]));
    //         }
    //       } else {
    //         console.log("about to walk further");
    //         growingPaths.concat(walk([pathClone]));
    //       }
    //       console.log("growingPaths");
    //       console.log(growingPaths);
    //     });
    //   });
    //   console.log("about to return paths");
    //   console.log(growingPaths);
    //   return growingPaths;
    // };

    let paths = [];
    let unfinishedPaths = [["start"]];

    let a = 0;
    while (unfinishedPaths.length > 0) {
      let expandedPaths = [];
      console.log({ unfinishedPaths });
      unfinishedPaths.forEach((p) => {
        const newPaths = walk(p);
        console.log(newPaths);
        expandedPaths = expandedPaths.concat(newPaths);
      });
      console.log({ expandedPaths });
      unfinishedPaths = expandedPaths.filter((p) => p[p.length - 1] != "end");
      const finishedPaths = expandedPaths.filter(
        (p) => p[p.length - 1] == "end"
      );
      console.log({ finishedPaths });
      finishedPaths.forEach((fp) => {
        paths.push(fp);
      });
      console.log({ paths });
      a++;
    }

    console.log(paths.length);

    console.log(`star23: ${0}`);
  });
}

export async function star24() {
  const input = await getInput(12).then((response) => {
    let i = response.inputArray.map((m) => m.split("-"));
    let caves = new Set(_.flatten(i));

    let branches = {};
    caves.forEach((c) => {
      branches[c] = i
        .filter((f) => f[0] == c)
        .map((m) => m[1])
        .concat(i.filter((f) => f[1] == c).map((m) => m[0]))
        .filter((f) => f != "start");
    });

    let isSmall = (cave) => {
      return cave[0] == cave[0].toLowerCase();
    };

    let expand = (path, newArray) => {
      return newArray.map((m) => [...path, m]);
    };

    let isLegalPath = (path) => {
      const smallCaves = p.filter((s) => isSmall(s));
      const set = Array.from(new Set(smallCaves));
      return (
        (set.length == smallCaves.length ||
          set.length + 1 == smallCaves.length) &&
        p.filter((f) => f == "end").length < 2
      );
    };

    let walk = (path) => {
      let newBranches = branches[path[path.length - 1]];
      let expanded = expand(path, newBranches);
      expanded = expanded.filter((p) => isLegalPath(p));
      return expanded;
    };

    let paths = [];
    let unfinishedPaths = [["start"]];

    while (unfinishedPaths.length > 0) {
      let expandedPaths = [];

      unfinishedPaths.forEach((p) => {
        expandedPaths = expandedPaths.concat(walk(p));
      });

      unfinishedPaths = expandedPaths.filter((p) => p[p.length - 1] != "end");
      const finishedPaths = expandedPaths.filter(
        (p) => p[p.length - 1] == "end"
      );

      finishedPaths.forEach((fp) => {
        paths.push(fp);
      });
    }

    console.log(`star24: ${paths.length}`);
  });
}

export async function star23Clean() {
  const input = await getInput(12).then((response) => {
    let cavePairs = response.inputArray.map((m) => m.split("-"));

    let caves = new Set(_.flatten(cavePairs));

    let nextCaves = {};
    caves.forEach((cave) => {
      nextCaves[cave] = cavePairs
        .filter((f) => f[0] == cave)
        .map((m) => m[1])
        .concat(cavePairs.filter((f) => f[1] == cave).map((m) => m[0]));
    });

    console.log(nextCaves);

    let count = (cave, visted = []) => {
      if (cave == "end") return 1;
      if (cave == cave.toLowerCase()) visted.push(cave);
      let total = 0;
      for (let nextCave of nextCaves[cave]) {
        if (visted.includes(nextCave)) continue;

        total += count(nextCave, visted);
      }
      if (cave == cave.toLowerCase()) visted.pop();
      return total;
    };

    console.log(`star23: ${count("start")}`);
  });
}
