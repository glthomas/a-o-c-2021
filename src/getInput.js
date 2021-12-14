import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function getInput(day) {
  console.log(`getting input for day: ${day}`);
  let returnInput;
  await axios
    .get(
      `https://adventofcode.com/2021/day/${day}/input`,
      {
        headers: {
          Cookie: `session=${process.env.SESSION}`,
        },
      },
      { withCredentials: true }
    )
    .then(function (response) {
      // handle success

      const inputArray = response.data.split("\n");
      if (inputArray[inputArray.length - 1] == "") {
        inputArray.pop();
      }
      console.log(`inputArray lenght:${inputArray.length}`);
      returnInput = {
        inputArray: inputArray,
        rawData: response.data,
      };
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .then(function () {
      // always executed
    });

  return await returnInput;
}
