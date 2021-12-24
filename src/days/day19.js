import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all, MatrixDependencies } from "mathjs";
const config = {};
const math = create(all, config);

export async function star37() {
  const input = await getInput(19).then((response) => {
    let k = response.inputArray;

    // let k = [
    //   "--- scanner 0 ---",
    //   "404,-588,-901",
    //   "528,-643,409",
    //   "-838,591,734",
    //   "390,-675,-793",
    //   "-537,-823,-458",
    //   "-485,-357,347",
    //   "-345,-311,381",
    //   "-661,-816,-575",
    //   "-876,649,763",
    //   "-618,-824,-621",
    //   "553,345,-567",
    //   "474,580,667",
    //   "-447,-329,318",
    //   "-584,868,-557",
    //   "544,-627,-890",
    //   "564,392,-477",
    //   "455,729,728",
    //   "-892,524,684",
    //   "-689,845,-530",
    //   "423,-701,434",
    //   "7,-33,-71",
    //   "630,319,-379",
    //   "443,580,662",
    //   "-789,900,-551",
    //   "459,-707,401",
    //   "",
    //   "--- scanner 1 ---",
    //   "686,422,578",
    //   "605,423,415",
    //   "515,917,-361",
    //   "-336,658,858",
    //   "95,138,22",
    //   "-476,619,847",
    //   "-340,-569,-846",
    //   "567,-361,727",
    //   "-460,603,-452",
    //   "669,-402,600",
    //   "729,430,532",
    //   "-500,-761,534",
    //   "-322,571,750",
    //   "-466,-666,-811",
    //   "-429,-592,574",
    //   "-355,545,-477",
    //   "703,-491,-529",
    //   "-328,-685,520",
    //   "413,935,-424",
    //   "-391,539,-444",
    //   "586,-435,557",
    //   "-364,-763,-893",
    //   "807,-499,-711",
    //   "755,-354,-619",
    //   "553,889,-390",
    //   "",
    //   "--- scanner 2 ---",
    //   "649,640,665",
    //   "682,-795,504",
    //   "-784,533,-524",
    //   "-644,584,-595",
    //   "-588,-843,648",
    //   "-30,6,44",
    //   "-674,560,763",
    //   "500,723,-460",
    //   "609,671,-379",
    //   "-555,-800,653",
    //   "-675,-892,-343",
    //   "697,-426,-610",
    //   "578,704,681",
    //   "493,664,-388",
    //   "-671,-858,530",
    //   "-667,343,800",
    //   "571,-461,-707",
    //   "-138,-166,112",
    //   "-889,563,-600",
    //   "646,-828,498",
    //   "640,759,510",
    //   "-630,509,768",
    //   "-681,-892,-333",
    //   "673,-379,-804",
    //   "-742,-814,-386",
    //   "577,-820,562",
    //   "",
    //   "--- scanner 3 ---",
    //   "-589,542,597",
    //   "605,-692,669",
    //   "-500,565,-823",
    //   "-660,373,557",
    //   "-458,-679,-417",
    //   "-488,449,543",
    //   "-626,468,-788",
    //   "338,-750,-386",
    //   "528,-832,-391",
    //   "562,-778,733",
    //   "-938,-730,414",
    //   "543,643,-506",
    //   "-524,371,-870",
    //   "407,773,750",
    //   "-104,29,83",
    //   "378,-903,-323",
    //   "-778,-728,485",
    //   "426,699,580",
    //   "-438,-605,-362",
    //   "-469,-447,-387",
    //   "509,732,623",
    //   "647,635,-688",
    //   "-868,-804,481",
    //   "614,-800,639",
    //   "595,780,-596",
    //   "",
    //   "--- scanner 4 ---",
    //   "727,592,562",
    //   "-293,-554,779",
    //   "441,611,-461",
    //   "-714,465,-776",
    //   "-743,427,-804",
    //   "-660,-479,-426",
    //   "832,-632,460",
    //   "927,-485,-438",
    //   "408,393,-506",
    //   "466,436,-512",
    //   "110,16,151",
    //   "-258,-428,682",
    //   "-393,719,612",
    //   "-211,-452,876",
    //   "808,-476,-593",
    //   "-575,615,604",
    //   "-485,667,467",
    //   "-680,325,-822",
    //   "-627,-443,-432",
    //   "872,-547,-609",
    //   "833,512,582",
    //   "807,604,487",
    //   "839,-516,451",
    //   "891,-625,532",
    //   "-652,-548,-490",
    //   "30,-46,-14",
    // ];

    //console.log(i);
    let i = math.matrix([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);

    let x = math.matrix([
      [1, 0, 0],
      [0, 0, -1],
      [0, 1, 0],
    ]);

    let y = math.matrix([
      [0, 0, 1],
      [0, 1, 0],
      [-1, 0, 0],
    ]);

    let possibleRotations = [
      [i],
      [x],
      [y],
      [x, x],
      [x, y],
      [y, x],
      [y, y],
      [x, x, x],
      [x, x, y],
      [x, y, x],
      [x, y, y],
      [y, x, x],
      [y, y, x],
      [y, y, y],
      [x, x, x, y],
      [x, x, y, x],
      [x, x, y, y],
      [x, y, x, x],
      [x, y, y, y],
      [y, x, x, x],
      [y, y, y, x],
      [x, x, x, y, x],
      [x, y, x, x, x],
      [x, y, y, y, x],
    ];

    let scanners = [];
    let scannerNum = -1;

    for (let a = 0; a < k.length; a++) {
      if (k[a][1] == "-") {
        scanners.push([]);
        scannerNum++;
        continue;
      } else if (k[a][0] != undefined) {
        scanners[scannerNum].push(k[a].split(",").map((m) => parseInt(m)));
      }
    }

    let allNonZeroScannersInAllOrientations = [];

    let rotateScanner = (scanner, rotations) => {
      return scanner.map((m) => math.multiply(m, ...rotations)._data);
    };

    let generateScannerPair = (scanner, index) => {
      let newPairs = [];
      for (let a = 0; a < scanner.length - 1; a++) {
        for (let b = a + 1; b < scanner.length; b++) {
          let pair = {
            s: index,
            b1: a,
            b2: b,
            _x: scanner[a][0] - scanner[b][0],
            _y: scanner[a][1] - scanner[b][1],
            _z: scanner[a][2] - scanner[b][2],
          };
          pair.h =
            Math.abs(pair._x * pair._y * pair._z) +
            Math.abs(pair._x) +
            Math.abs(pair._y) +
            Math.abs(pair._z);

          newPairs.push(pair);
        }
      }
      //console.log(newPairs);

      return newPairs;
    };

    let scannerPairsForAllOrientationsOfRemainingScanners = [];

    for (let c = 0; c < allNonZeroScannersInAllOrientations.length; c++) {
      let pairForAllOrientationsOfThisScanner = [];
      for (let d = 0; d < allNonZeroScannersInAllOrientations[c].length; d++) {
        pairForAllOrientationsOfThisScanner.push(
          generateScannerPair(allNonZeroScannersInAllOrientations[c][d], c + 1)
        );
      }
      scannerPairsForAllOrientationsOfRemainingScanners.push(
        pairForAllOrientationsOfThisScanner
      );
    }

    let findMatchingHeuristics = (pairSet1, pairSet2) => {
      let heurMatches = [];
      for (let a = 0; a < pairSet1.length; a++) {
        for (let b = 0; b < pairSet2.length; b++) {
          if (pairSet1[a].h == pairSet2[b].h) {
            // console.log("matched on heuristics");
            let thisMatch = [pairSet1[a], pairSet2[b]];
            // console.log(thisMatch);
            heurMatches.push(thisMatch);
          }
        }
      }

      return heurMatches;
    };

    let checkTransform = (heurMatches) => {
      //heurMatches = heurMatches.filter((h) => h.h != 0);

      let setOfAllHeuristicMatches = [];

      for (let a = 0; a < heurMatches.length; a++) {
        let xdiff1 = heurMatches[a][0]._x;
        let xdiff2 = heurMatches[a][1]._x;
        let ydiff1 = heurMatches[a][0]._y;
        let ydiff2 = heurMatches[a][1]._y;
        let zdiff1 = heurMatches[a][0]._z;
        let zdiff2 = heurMatches[a][1]._z;

        if (xdiff1 == xdiff2 && ydiff1 == ydiff2 && zdiff1 == zdiff2) {
          //   console.log("matching transform found");
          setOfAllHeuristicMatches.push(heurMatches[a]);
        }
      }
      return setOfAllHeuristicMatches;
    };

    //console.log(deduceTransfrom(heurMatchesAllOrients[0]));

    //console.log(heurMatches.length);

    ////////////////////////////////
    ////////////////////////////////
    ////////////////////////////////
    ////////////////////////////////

    let allBeacons = [];

    let rotationAndTransformationKnown = {
      0: { rotIndex: undefined, transform: undefined, relativeTo: 0 },
    };
    let leadScanner = scanners[0]; //.sort((a, b) => a[0] - b[0]);
    for (let v = 0; v < 8; v++) {
      //leadScanner = scanners[v]; //.sort((a, b) => a[0] - b[0]);
      console.log({ v });
      for (let w = 0; w < scanners.length; w++) {
        if (!rotationAndTransformationKnown[w]) {
          if (v != w) {
            //console.log({ v, w });
            let nextScanner = scanners[w];
            let leadScannerPairs = generateScannerPair(leadScanner, v);

            for (let a = 0; a < possibleRotations.length; a++) {
              let rotated = rotateScanner(
                nextScanner,
                possibleRotations[a]
              ).sort((a, b) => a[0] - b[0]);

              let rotatedPairs = generateScannerPair(rotated, w);

              let heuristicMatches = findMatchingHeuristics(
                leadScannerPairs,
                rotatedPairs
              );

              //console.log(heuristicMatches.length);

              let transforms = checkTransform(heuristicMatches);

              if (transforms.length > 0) {
                //console.log(transforms.length);
              }
              if (transforms.length >= 12) {
                // record the rotation and the transformation data relative to the leadScanner index

                let xOffset =
                  leadScanner[transforms[0][0].b1][0] -
                  rotated[transforms[0][1].b1][0];
                let yOffset =
                  leadScanner[transforms[0][0].b1][1] -
                  rotated[transforms[0][1].b1][1];
                let zOffset =
                  leadScanner[transforms[0][0].b1][2] -
                  rotated[transforms[0][1].b1][2];

                //console.log([xOffset, yOffset, zOffset]);

                let rotInfo = {
                  scanner: w,
                  rotIndex: a,
                  transform: [xOffset, yOffset, zOffset],
                  relativeTo: v,
                };
                rotationAndTransformationKnown[w] = {
                  rotIndex: a,
                  transform: [xOffset, yOffset, zOffset],
                  relativeTo: v,
                };

                //console.log(rotInfo);
                let rotatedAndTranslated = rotated.map((m) => [
                  m[0] + xOffset,
                  m[1] + yOffset,
                  m[2] + zOffset,
                ]);

                a = 1000;
                rotatedAndTranslated.forEach((rt) => {
                  if (
                    leadScanner.some(
                      (f) => f[0] == rt[0] && f[1] == rt[1] && f[2] == rt[2]
                    )
                  ) {
                  } else {
                    leadScanner.push(rt);
                  }
                });
              }
            }
          }
        }
        console.log(`length: ${leadScanner.length}`);
      }
    }

    // for (let q = 0; q < scanner1.length; q++) {
    //   console.log(scanner1[q]);
    // }

    // console.log(_.countBy(scanner1));

    console.log(rotationAndTransformationKnown);

    rotationAndTransformationKnown[0].transform = [0, 0, 0];
    let max = 0;
    for (let u = 0; u < scanners.length - 1; u++) {
      for (let r = u + 1; r < scanners.length; r++) {
        let tempX =
          rotationAndTransformationKnown[u].transform[0] -
          rotationAndTransformationKnown[r].transform[0];
        let tempY =
          rotationAndTransformationKnown[u].transform[1] -
          rotationAndTransformationKnown[r].transform[1];
        let tempZ =
          rotationAndTransformationKnown[u].transform[2] -
          rotationAndTransformationKnown[r].transform[2];
        let dist = Math.abs(tempX) + Math.abs(tempY) + Math.abs(tempZ);
        if (dist > max) {
          max = dist;
          console.log({ max });
        }
      }
    }
    console.log(`star37: ${leadScanner.length}`);
  });
}

export async function star38() {
  const input = await getInput(19).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let answer = 0;
    console.log(`star38: ${answer}`);
  });
}
