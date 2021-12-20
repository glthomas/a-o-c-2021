import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all } from "mathjs";

export async function star35() {
  const input = await getInput(19).then((response) => {
    let i = response.inputArray;

    let findLeftMostPair = (str) => {
      let open = 0;

      for (let a = 0; a < str.length; a++) {
        open += str[a] == "[" ? 1 : 0;
        open -= str[a] == "]" ? 1 : 0;

        if (open > 4 && str[a] == "[") {
          let innerStrArray = str.substring(
            a,
            a + str.substring(a).indexOf("]") + 1
          );
          let pair;
          try {
            // try this trick to detect if string is numeric pair
            pair = JSON.parse(innerStrArray);
          } catch (e) {}
          if (pair) {
            let returnObj = {
              pair,
              startingAt: a,
              endingAt: a + str.substring(a).indexOf("]"),
            };
            returnObj.nextCommaAt =
              returnObj.endingAt +
              str.substring(returnObj.endingAt).indexOf(",");
            return returnObj;
          }
        }
      }
      return null;
    };

    let findRegNumberLeft = (str, index) => {
      let leftString = str.substring(0, index);
      leftString = leftString.replace(/\[/g, "");
      leftString = leftString.replace(/\]/g, ""); // logically speaking I might not need this line
      if (leftString[leftString.length - 1] == ",") {
        leftString = leftString.substring(0, leftString.length - 1);
      }
      let numberArrayToLeft = leftString.split(",");
      let nearestRegNumber = numberArrayToLeft[numberArrayToLeft.length - 1];
      return nearestRegNumber;
    };

    let findRegNumberRight = (str, index) => {
      let rightString = str.substring(0, index);
      rightString = rightString.replace(/\[/g, "");
      rightString = rightString.replace(/\]/g, ""); // logically speaking I might not need this line
      if (rightString[0] == ",") {
        rightString = rightString.substring(1);
      }
      let numberArrayToRight = rightString.split(",");
      let nearestRegNumber = numberArrayToRight[0];
      return nearestRegNumber;
    };

    let buildLeftString = (str, pair) => {
      let existingleftString = str.substring(0, pair.startingAt);
      let leftString = "";
      let firstRegNumberLeftOfPair = findRegNumberLeft(str, pair.startingAt);
      if (firstRegNumberLeftOfPair != "") {
        let indexOfLastRegNumberLeftOfPair = str
          .substring(0, pair.startingAt)
          .lastIndexOf(firstRegNumberLeftOfPair);

        leftString +=
          str.substring(0, indexOfLastRegNumberLeftOfPair) +
          (parseInt(firstRegNumberLeftOfPair) + pair.pair[0]) +
          existingleftString.substring(
            indexOfLastRegNumberLeftOfPair + firstRegNumberLeftOfPair.length
          );
      } else {
        leftString = existingleftString;
      }
      return leftString;
    };

    let buildRightString = (str, pair) => {
      let existingRightString = str.substring(pair.endingAt + 1);
      let rightString = "";

      let firstRegNumberRightOfPair = findRegNumberRight(
        existingRightString,
        pair.endingAt
      );
      if (firstRegNumberRightOfPair != "") {
        let indexOfFirstRegNumberRightOfPair = existingRightString.indexOf(
          firstRegNumberRightOfPair
        );
        rightString += existingRightString.substring(
          0,
          indexOfFirstRegNumberRightOfPair
        );
        rightString += parseInt(firstRegNumberRightOfPair) + pair.pair[1];
        rightString += existingRightString.substring(
          indexOfFirstRegNumberRightOfPair + firstRegNumberRightOfPair.length
        );
      } else {
        rightString = existingRightString;
      }
      return rightString;
    };

    let explode = (str) => {
      //find the first pair that is deeply nested inside four pairs
      let pair = findLeftMostPair(str);
      console.log({ pair });

      let explodedStr = "";
      if (pair) {
        explodedStr += buildLeftString(str, pair);
        explodedStr += "0";
        explodedStr += buildRightString(str, pair);
        return explodedStr;
      }
      return str;
    };

    let split = (str) => {
      console.log(`splitting ${str}`);
      let splitStr = str;
      splitStr = splitStr.replace(/\[/g, "");
      splitStr = splitStr.replace(/\]/g, "");
      let strArray = splitStr.split(",");
      let first = strArray.find((f) => parseInt(f) > 9);

      if (first) {
        let replaceStr = `[${Math.floor(first / 2)},${Math.ceil(first / 2)}]`;
        str = str.replace(first, replaceStr);
      }
      console.log(`after split: ${str}`);
      return str;
    };

    let reduce = (str) => {
      let reducedStr = str;
      reducedStr = explode(str);

      if (reducedStr != str) {
        reducedStr = reduce(reducedStr);
      } else {
        reducedStr = split(reducedStr);
        if (reducedStr != str) {
          {
            reducedStr = reduce(reducedStr);
          }
        }
      }

      return reducedStr;
    };

    let grow = i[0];
    for (let a = 1; a < i.length; a++) {
      grow = `[${grow},${i[a]}]`;
      grow = reduce(grow);
    }

    grow = grow.replace(/\[/g, "[3*");
    grow = grow.replace(/\]/g, "*2]");
    grow = grow.replace(/,/g, "+");

    console.log(`star35: ${eval(grow)}`);
  });
}

export async function star36() {
  const input = await getInput(18).then((response) => {
    let i = response.inputArray;

    let findLeftMostPair = (str) => {
      let open = 0;

      for (let a = 0; a < str.length; a++) {
        open += str[a] == "[" ? 1 : 0;
        open -= str[a] == "]" ? 1 : 0;

        if (open > 4 && str[a] == "[") {
          let innerStrArray = str.substring(
            a,
            a + str.substring(a).indexOf("]") + 1
          );
          let pair;
          try {
            // try this trick to detect if string is numeric pair
            pair = JSON.parse(innerStrArray);
          } catch (e) {}
          if (pair) {
            let returnObj = {
              pair,
              startingAt: a,
              endingAt: a + str.substring(a).indexOf("]"),
            };
            returnObj.nextCommaAt =
              returnObj.endingAt +
              str.substring(returnObj.endingAt).indexOf(",");
            return returnObj;
          }
        }
      }
      return null;
    };

    let findRegNumberLeft = (str, index) => {
      let leftString = str.substring(0, index);
      leftString = leftString.replace(/\[/g, "");
      leftString = leftString.replace(/\]/g, ""); // logically speaking I might not need this line
      if (leftString[leftString.length - 1] == ",") {
        leftString = leftString.substring(0, leftString.length - 1);
      }
      let numberArrayToLeft = leftString.split(",");
      let nearestRegNumber = numberArrayToLeft[numberArrayToLeft.length - 1];
      return nearestRegNumber;
    };

    let findRegNumberRight = (str, index) => {
      let rightString = str.substring(0, index);
      rightString = rightString.replace(/\[/g, "");
      rightString = rightString.replace(/\]/g, ""); // logically speaking I might not need this line
      if (rightString[0] == ",") {
        rightString = rightString.substring(1);
      }
      let numberArrayToRight = rightString.split(",");
      let nearestRegNumber = numberArrayToRight[0];
      return nearestRegNumber;
    };

    let buildLeftString = (str, pair) => {
      let existingleftString = str.substring(0, pair.startingAt);
      let leftString = "";
      let firstRegNumberLeftOfPair = findRegNumberLeft(str, pair.startingAt);

      if (firstRegNumberLeftOfPair != "") {
        let indexOfLastRegNumberLeftOfPair = str
          .substring(0, pair.startingAt)
          .lastIndexOf(firstRegNumberLeftOfPair);

        leftString +=
          str.substring(0, indexOfLastRegNumberLeftOfPair) +
          (parseInt(firstRegNumberLeftOfPair) + pair.pair[0]) +
          existingleftString.substring(
            indexOfLastRegNumberLeftOfPair + firstRegNumberLeftOfPair.length
          );
      } else {
        leftString = existingleftString;
      }
      return leftString;
    };

    let buildRightString = (str, pair) => {
      let existingRightString = str.substring(pair.endingAt + 1);
      let rightString = "";

      let firstRegNumberRightOfPair = findRegNumberRight(
        existingRightString,
        pair.endingAt
      );

      if (firstRegNumberRightOfPair != "") {
        let indexOfFirstRegNumberRightOfPair = existingRightString.indexOf(
          firstRegNumberRightOfPair
        );
        rightString += existingRightString.substring(
          0,
          indexOfFirstRegNumberRightOfPair
        );
        rightString += parseInt(firstRegNumberRightOfPair) + pair.pair[1];
        rightString += existingRightString.substring(
          indexOfFirstRegNumberRightOfPair + firstRegNumberRightOfPair.length
        );
      } else {
        rightString = existingRightString;
      }
      return rightString;
    };

    let explode = (str) => {
      //find the first pair that is deeply nested inside four pairs
      let pair = findLeftMostPair(str);

      let explodedStr = "";
      if (pair) {
        explodedStr += buildLeftString(str, pair);
        explodedStr += "0";
        explodedStr += buildRightString(str, pair);
        return explodedStr;
      }
      return str;
    };

    let split = (str) => {
      let splitStr = str;
      splitStr = splitStr.replace(/\[/g, "");
      splitStr = splitStr.replace(/\]/g, "");
      let strArray = splitStr.split(",");
      let first = strArray.find((f) => parseInt(f) > 9);

      if (first) {
        let replaceStr = `[${Math.floor(first / 2)},${Math.ceil(first / 2)}]`;
        str = str.replace(first, replaceStr);
      }

      return str;
    };

    let reduce = (str) => {
      let reducedStr = str;
      reducedStr = explode(str);

      if (reducedStr != str) {
        reducedStr = reduce(reducedStr);
      } else {
        reducedStr = split(reducedStr);
        if (reducedStr != str) {
          {
            reducedStr = reduce(reducedStr);
          }
        }
      }

      return reducedStr;
    };

    let largest = 0;
    let grow;
    for (let a = 1; a < i.length; a++) {
      for (let b = 0; b < i.length; b++) {
        if (a != b) {
          console.log({ a, b, largest });
          grow = `[${i[a]},${i[b]}]`;
          grow = reduce(grow);
          grow = grow.replace(/\[/g, "[3*");
          grow = grow.replace(/\]/g, "*2]");
          grow = grow.replace(/,/g, "+");
          let mag = eval(grow)[0];
          if (mag > largest) {
            largest = mag;
          }
        }
      }
    }

    grow = grow.replace(/\[/g, "[3*");
    grow = grow.replace(/\]/g, "*2]");
    grow = grow.replace(/,/g, "+");

    let answer = 0;
    console.log(`star36: ${eval(grow)}`);
  });
}
