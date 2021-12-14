const star3 = () => {
  let horizontal = 0;
  let depth = 0;

  for (let i = 0; i < inputArray.length; i++) {
    const firstChar = inputArray[i].charAt(0);
    const lastChar = parseInt(inputArray[i].slice(-1));

    if (firstChar === "f") {
      horizontal = horizontal + lastChar;
    } else if (firstChar === "d") {
      depth = depth + lastChar;
    } else {
      depth = depth - lastChar;
    }
  }
  console.log({ horizontal });
  console.log({ depth });
  console.log(`star 3 answer: ${horizontal * depth}`);
};

const star4 = () => {
  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for (let i = 0; i < inputArray.length; i++) {
    const firstChar = inputArray[i].charAt(0);
    const lastChar = parseInt(inputArray[i].slice(-1));

    if (firstChar === "f") {
      horizontal = horizontal + lastChar;
      depth = depth + aim * lastChar;
    } else if (firstChar === "d") {
      aim = aim + lastChar;
    } else {
      aim = aim - lastChar;
    }
  }
  console.log({ horizontal });
  console.log({ depth });
  console.log(`star 4 answer: ${horizontal * depth}`);
};
