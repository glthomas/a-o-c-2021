function add(accumulator, a) {
  return accumulator + a;
}

const star5 = async () => {
  const input = await getInput(3).then((response) => {
    console.log("response");
    console.log(response);

    let inputArray = response.inputArray;
    console.log(inputArray.length);

    let horizontal = 0;
    let depth = 0;
    let aim = 0;
    let a = 0;
    let b = 0;
    let c = 0;

    let totalGamma = 0;
    let totalEpsilon = 0;

    let ox = inputArray;
    let co = inputArray;

    for (let i = 11; i > -1; i--) {
      console.log({ i });
      let cobit = co.map((m) => parseInt(m.charAt(11 - i)));
      let oxbit = ox.map((m) => parseInt(m.charAt(11 - i)));
      let oxsum = oxbit.reduce(add, 0);
      let cosum = cobit.reduce(add, 0);
      console.log({ oxsum });
      console.log({ cosum });
      if (oxsum >= ox.length / 2) {
        // most 1's
        // filter input by 1's
        console.log("mostly 1");
        if (ox.length > 1) {
          ox = ox.filter((f) => parseInt(f.charAt(11 - i)) == "1");
          console.log(`new ox array len: ${ox.length}`);
        }
        // totalGamma = totalGamma + Math.pow(2, i) * 1;
        // console.log(totalGamma);
      } else {
        console.log("mostly 0");
        if (ox.length > 1) {
          ox = ox.filter((f) => parseInt(f.charAt(11 - i)) == "0");
          console.log(`new ox array len: ${ox.length}`);
        }
      }

      console.log("input array length");
      console.log(inputArray.length);
      if (cosum < co.length / 2) {
        // fewest 1's
        // filter input by 1's
        console.log("fewest 1's");
        if (co.length > 1) {
          co = co.filter((f) => parseInt(f.charAt(11 - i)) == "1");
          console.log(`new co array len: ${co.length}`);
          if (co.length < 4) console.log(co);
        }
        // totalGamma = totalGamma + Math.pow(2, i) * 1;
        // console.log(totalGamma);
      } else {
        console.log("fewest 0's");
        if (co.length > 1) {
          co = co.filter((f) => parseInt(f.charAt(11 - i)) == "0");
          console.log(`new co array len: ${co.length}`);
          if (co.length < 4) console.log(co);
        }
      }
    }
    console.log(ox[0]);
    console.log(co[0]);

    const arrayox = Array.from(ox);
    let oxVal = 0;
    let coVal = 0;
    for (let g = 0; g < 12; g++) {
      oxVal = oxVal + parseInt(ox[0].charAt(g)) * Math.pow(2, 11 - g);

      coVal = coVal + parseInt(co[0].charAt(g)) * Math.pow(2, 11 - g);
    }

    console.log(oxVal);
    console.log(coVal);
    console.log(oxVal * coVal);
  });
};
