const KERNEL = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [0, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

const enhance = ([[iea], image], rounds) =>
  [...Array(rounds)]
    .map((_, round) => round & 1)
    .map((r) => (iea[0] === "." ? [0, 0] : [0x1ff, 0])[r])
    .map((vi) => iea[vi])
    .reduce(
      (image, thevoid) =>
        [...Array(image.length + 2)].map((_, y) =>
          [...Array(image.length + 2)]
            .map((_, x) =>
              KERNEL.map(([dx, dy]) => [dx + x, dy + y])
                .map(([px, py]) => image[py - 1]?.[px - 1] ?? thevoid)
                .map((v) => (v === "#" ? 1 : 0))
                .reduce((num, bit) => (num << 1) | bit)
            )
            .map((index) => iea[index])
        ),
      image
    )
    .flat()
    .filter((v) => v === "#").length;
