// problem https://adventofcode.com/2021/day/16

//const fs = require("fs");
//import fs from "fs";

const main = async () => {
  let hexString = "";
  let bitString = "";
  let totalReadLen = 0;
  let finalPayload = 0;
  let versionSum = 0;

  //hexString = fs.readFileSync("./input.txt").toString();
  hexString =
    "220D790065B2745FF004672D99A34E5B33439D96CEC80373C0068663101A98C406A5E7395DC1804678BF25A4093BFBDB886CA6E11FDE6D93D16A100325E5597A118F6640600ACF7274E6A5829B00526C167F9C089F15973C4002AA4B22E800FDCFD72B9351359601300424B8C9A00BCBC8EE069802D2D0B945002AB2D7D583E3F00016B05E0E9802BA00B4F29CD4E961491CCB44C6008E80273C393C333F92020134B003530004221347F83A200D47F89913A66FB6620016E24A007853BE5E944297AB64E66D6669FCEA0112AE06009CAA57006A0200EC258FB0440010A8A716A321009DE200D44C8E31F00010887B146188803317A3FC5F30056C0150004321244E88C000874468A91D2291802B25EB875802B28D13550030056C0169FB5B7ECE2C6B2EF3296D6FD5F54858015B8D730BB24E32569049009BF801980803B05A3B41F1007625C1C821256D7C848025DE0040E5016717247E18001BAC37930E9FA6AE3B358B5D4A7A6EA200D4E463EA364EDE9F852FF1B9C8731869300BE684649F6446E584E61DE61CD4021998DB4C334E72B78BA49C126722B4E009C6295F879002093EF32A64C018ECDFAF605989D4BA7B396D9B0C200C9F0017C98C72FD2C8932B7EE0EA6ADB0F1006C8010E89B15A2A90021713610C202004263E46D82AC06498017C6E007901542C04F9A0128880449A8014403AA38014C030B08012C0269A8018E007A801620058003C64009810010722EC8010ECFFF9AAC32373F6583007A48CA587E55367227A40118C2AC004AE79FE77E28C007F4E42500D10096779D728EB1066B57F698C802139708B004A5C5E5C44C01698D490E800B584F09C8049593A6C66C017100721647E8E0200CC6985F11E634EA6008CB207002593785497652008065992443E7872714";

  bitString = hexToBitStirng(hexString);

  console.log("original bit string length", bitString.length);

  [bitString, totalReadLen, versionSum, finalPayload] = readPacket(
    bitString,
    versionSum
  );

  console.log(
    "total legth read",
    totalReadLen,
    "+",
    bitString.length,
    "bits of garbage =",
    totalReadLen + bitString.length
  );
  console.log("version sum", versionSum);
  console.log("final payload", finalPayload); // part 2
};

const hexToBitStirng = (hexString = "") => {
  const bitMap = {
    0: "0000",
    1: "0001",
    2: "0010",
    3: "0011",
    4: "0100",
    5: "0101",
    6: "0110",
    7: "0111",
    8: "1000",
    9: "1001",
    A: "1010",
    B: "1011",
    C: "1100",
    D: "1101",
    E: "1110",
    F: "1111",
  };

  return hexString
    .split("")
    .map((hexChar) => bitMap[hexChar])
    .join("");
};

const readPacket = (packet, versionSum) => {
  let pktLen = 0;
  let payloadParser, version, pktTid, payload, readLen;

  [packet, payloadParser, version, pktTid, readLen] = headerParser(packet);
  pktLen += readLen;
  versionSum += parseInt(version, 2);

  [packet, readLen, versionSum, payload] = payloadParser(
    packet,
    versionSum,
    pktTid
  );
  pktLen += readLen;

  return [packet, pktLen, versionSum, payload];
};

const headerParser = (packet = "") => {
  if (packet === "") {
    return [packet, null, 0, 0, 0];
  }

  let packetArr = packet.split("");
  let version = packetArr.splice(0, 3);
  let pktTid = packetArr.splice(0, 3);
  let payloadParser = (bitString = "") => bitString;

  switch (pktTid.join("")) {
    case "100":
      payloadParser = parseLiliteral;
      break;

    default:
      payloadParser = parseOperator;
      break;
  }

  return [
    packetArr.join(""),
    payloadParser,
    version.join(""),
    pktTid.join(""),
    6,
  ];
};

const parseLiliteral = (packet = "", versionSum) => {
  if (packet === "") {
    return [packet, 0, 0];
  }

  let packetArr = packet.split("");
  let foundLastGroup = false;
  let literalBitString = [];
  let lenRead = 0;

  while (!foundLastGroup) {
    let [groupPrefix] = packetArr.splice(0, 1);
    let group = packetArr.splice(0, 4);
    lenRead += group.length + 1;

    literalBitString = literalBitString.concat(group);

    if (groupPrefix === "0") {
      foundLastGroup = true;
    }
  }

  return [
    packetArr.join(""),
    lenRead,
    versionSum,
    parseInt(literalBitString.join(""), 2),
  ];
};

const parseOperator = (packet = "", versionSum, pktTid) => {
  if (packet === "") {
    return [packet, 0, 0];
  }

  let packetArr = packet.split("");
  let lenTid = packetArr.shift();
  let totalReadLen = 1;
  let subpacketsLen = 0;
  let subpacketsCount = 0;
  let readCount = 0;
  let readLen = 0;
  let operationPayload = 0;
  let operands = [];
  let endOperatorParse = () => false;
  let operator = getOperatorExecutor(pktTid);

  switch (lenTid) {
    case "0":
      subpacketsLen = parseInt(packetArr.splice(0, 15).join(""), 2);
      totalReadLen += 15;
      endOperatorParse = ([readLen, subpacketsLen, ,]) =>
        readLen >= subpacketsLen;

      break;

    case "1":
      subpacketsCount = parseInt(packetArr.splice(0, 11).join(""), 2);
      totalReadLen += 11;
      endOperatorParse = ([, , readCount, subpacketsCount]) =>
        readCount >= subpacketsCount;

      break;

    default:
      break;
  }

  packet = packetArr.join("");

  while (
    !endOperatorParse([readLen, subpacketsLen, readCount, subpacketsCount])
  ) {
    let pktLen, payload;

    [packet, pktLen, versionSum, payload] = readPacket(packet, versionSum);

    operands.push(payload); // part 2

    readCount++;
    readLen += pktLen;
  }

  operationPayload = operator(operands); // part 2
  totalReadLen += readLen; // part 2

  return [packet, totalReadLen, versionSum, operationPayload];
};

// part 2
const getOperatorExecutor = (pktTid) => {
  const pktTidBase10 = parseInt(pktTid, 2);

  switch (pktTidBase10) {
    case 0:
      return (payloads) => payloads.reduce((acc, n) => acc + n);

    case 1:
      return (payloads) => payloads.reduce((acc, n) => acc * n);

    case 2:
      return (payloads) => Math.min(...payloads);

    case 3:
      return (payloads) => Math.max(...payloads);

    case 5:
      return (payloads) => Number(payloads[0] > payloads[1]);

    case 6:
      return (payloads) => Number(payloads[0] < payloads[1]);

    case 7:
      return (payloads) => Number(payloads[0] === payloads[1]);

    default:
      break;
  }
};

main();
