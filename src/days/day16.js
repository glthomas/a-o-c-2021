import { getInput } from "../getInput.js";
import _ from "lodash";
import { create, all, re } from "mathjs";

export async function star31() {
  const input = await getInput(16).then((response) => {
    //let i = "D2FE28";
    //let i = response.inputArray[0];
    //let i = "38006F45291200";
    //let i = "EE00D40C823060";
    //let i = "8A004A801A8002F478";
    //let i = "620080001611562C8802118E34";
    let i = "C0015000016115A2E0802F182340";
    //let i = "A0016C880162017C3686B18A3D4780";
    // let i =
    //   "220D790065B2745FF004672D99A34E5B33439D96CEC80373C0068663101A98C406A5E7395DC1804678BF25A4093BFBDB886CA6E11FDE6D93D16A100325E5597A118F6640600ACF7274E6A5829B00526C167F9C089F15973C4002AA4B22E800FDCFD72B9351359601300424B8C9A00BCBC8EE069802D2D0B945002AB2D7D583E3F00016B05E0E9802BA00B4F29CD4E961491CCB44C6008E80273C393C333F92020134B003530004221347F83A200D47F89913A66FB6620016E24A007853BE5E944297AB64E66D6669FCEA0112AE06009CAA57006A0200EC258FB0440010A8A716A321009DE200D44C8E31F00010887B146188803317A3FC5F30056C0150004321244E88C000874468A91D2291802B25EB875802B28D13550030056C0169FB5B7ECE2C6B2EF3296D6FD5F54858015B8D730BB24E32569049009BF801980803B05A3B41F1007625C1C821256D7C848025DE0040E5016717247E18001BAC37930E9FA6AE3B358B5D4A7A6EA200D4E463EA364EDE9F852FF1B9C8731869300BE684649F6446E584E61DE61CD4021998DB4C334E72B78BA49C126722B4E009C6295F879002093EF32A64C018ECDFAF605989D4BA7B396D9B0C200C9F0017C98C72FD2C8932B7EE0EA6ADB0F1006C8010E89B15A2A90021713610C202004263E46D82AC06498017C6E007901542C04F9A0128880449A8014403AA38014C030B08012C0269A8018E007A801620058003C64009810010722EC8010ECFFF9AAC32373F6583007A48CA587E55367227A40118C2AC004AE79FE77E28C007F4E42500D10096779D728EB1066B57F698C802139708B004A5C5E5C44C01698D490E800B584F09C8049593A6C66C017100721647E8E0200CC6985F11E634EA6008CB207002593785497652008065992443E7872714";
    console.log(i);

    const packet = parsePacket(i);

    let hex = [
      "0 = 0000",
      "1 = 0001",
      "2 = 0010",
      "3 = 0011",
      "4 = 0100",
      "5 = 0101",
      "6 = 0110",
      "7 = 0111",
      "8 = 1000",
      "9 = 1001",
      "A = 1010",
      "B = 1011",
      "C = 1100",
      "D = 1101",
      "E = 1110",
      "F = 1111",
    ];

    const hexArray = hex.map((m) => m.split(" = "));

    console.log(hexArray);

    let hexmap = new Map(hexArray);

    let bits = i
      .split("")
      .map((m) => hexmap.get(m))
      .join("");

    console.log(bits);

    let extractPacket = (str) => {
      console.log({ str });
      let header = getHeader(str);
      let potentialMessage = getMessage(str);
      let packetType = getPacketType(header);

      if (isLiteral(packetType)) {
        let literalValueSubPacket = header;
        let fiveBitGroups = potentialMessage.match(/.{5}/g);
        for (let group of fiveBitGroups) {
          literalValueSubPacket += group;
          if (group.charAt(0) == "0") {
            break;
          }
        }
        return literalValueSubPacket;
      }
      if (isOperator(packetType)) {
      }
    };

    let getSubPacketsByTotalLength = (packet) => {
      console.log(
        `Extract subpackets totaling a length of: ${packet.totalLengthOfSubPackets}`
      );

      console.log(packet);

      console.log(packet.stringContainingSubPackets);
      console.log(bits.substring(bitsChecked.length));

      let workingBits = new String(packet.stringContainingSubPackets);
      let preloopBitsChecked = bitsChecked;
      while (
        bitsChecked.length - preloopBitsChecked.length <
        packet.totalLengthOfSubPackets
      ) {
        let subPacket = {
          bits: workingBits,
          version: undefined,
          type: undefined,
          subPackets: [],
        };

        packet.subPackets.push(readPacket(subPacket));
        packet.relevantBits += subPacket.relevantBits;
        workingBits = workingBits.substring(subPacket.relevantBits.length);
        console.log(workingBits);
        console.log(bits.substring(bitsChecked.length));
      }
      return;
    };

    let getSubPacketsBySubPacketCount = (packet) => {
      console.log(
        `Extract ${packet.totalCountOfSubPackets} number of subPackeets`
      );
      console.log(packet);

      let workingBits = new String(packet.stringContainingSubPackets);
      while (packet.subPackets.length < packet.totalCountOfSubPackets) {
        let subPacket = {
          bits: workingBits,
          version: undefined,
          type: undefined,
          subPackets: [],
        };

        packet.subPackets.push(readPacket(subPacket));

        workingBits = workingBits.substring(subPacket.relevantBits.length);
        console.log(workingBits);
        console.log(bits.substring(bitsChecked.length));
      }
      return;
    };

    let getHeader = (packet) => packet.substring(0, 6);
    let getMessage = (packet) => packet.substring(6);

    let getVersion = (header) => {
      return parseInt(header.substring(0, 3), 2);
    };
    let getPacketType = (header) => {
      return parseInt(header.substring(3, 6), 2);
    };

    let isOperator = (type) => type != 4;
    let isLiteral = (type) => type == 4;

    let isLengthType_bitLength = (lengthTypeId) => lengthTypeId == "0";
    let isLengthType_subPacketCount = (lengthTypeId) => lengthTypeId == "1";

    let processBitLength = (packet) => {
      packet.totalLengthOfSubPackets = parseInt(
        packet.message.substring(0, 15),
        2
      );
      packet.relevantBits += packet.message.substring(0, 15);
      bitsChecked += packet.message.substring(0, 15);
      packet.stringContainingSubPackets = packet.message.substring(15);

      getSubPacketsByTotalLength(packet);
      return;
    };

    let processSubPacketCount = (packet) => {
      packet.totalCountOfSubPackets = parseInt(
        packet.message.substring(0, 11),
        2
      );
      packet.stringContainingSubPackets = packet.message.substring(11);
      packet.relevantBits += packet.message.substring(0, 11);
      bitsChecked += packet.message.substring(0, 11);

      let subPackets = getSubPacketsBySubPacketCount(packet);
      return subPackets;
    };

    let readOperator = (packet) => {
      console.log("operator packet");
      packet.lengthTypeId = packet.bits.charAt(6);
      packet.relevantBits += packet.lengthTypeId;
      bitsChecked += packet.lengthTypeId;
      packet.message = packet.bits.substring(7);

      isLengthType_bitLength(packet.lengthTypeId)
        ? processBitLength(packet)
        : processSubPacketCount(packet);

      return;
    };

    let literals = [];
    let versions = [];
    let packets = [];
    let bitsChecked = "";

    let readPacket = (packet) => {
      packet.header = getHeader(packet.bits);
      packet.version = getVersion(packet.header);
      packet.type = getPacketType(packet.header);
      packet.isOperator = isOperator(packet.type);
      packet.isLiteal = isLiteral(packet.type);
      console.log(`reading packet: ${JSON.stringify(packet, null, 2)}`);

      versions.push(packet.version);
      packet.relevantBits = packet.header;
      bitsChecked += packet.header;

      if (isLiteral(packet.type)) {
        console.log("literal packet found");
        packet.message = getMessage(packet.bits);
        let literalValueAs4BitWords = "";

        let fiveBitGroups = packet.message.match(/.{5}/g);
        if (fiveBitGroups != null) {
          for (let group of fiveBitGroups) {
            packet.relevantBits += group;
            bitsChecked += group;
            literalValueAs4BitWords += group.substring(1);
            if (group.charAt(0) == "0") {
              break;
            }
          }
        }

        packet.literalValueAs4BitWords = literalValueAs4BitWords;
        packet.literalValue = parseInt(packet.literalValueAs4BitWords, 2);
      }
      if (isOperator(packet.type)) {
        readOperator(packet);
      }

      packet.bitsChecked += packet.relevantBits;
      return packet;
    };

    let initialPacket = {
      bits: bits,
      version: undefined,
      type: undefined,
      subPackets: [],
    };
    let packetHierarchy = readPacket(initialPacket);

    console.log(`packetHierarchy: ${JSON.stringify(packetHierarchy, null, 2)}`);

    console.log(versions);

    let answer = 0;
    console.log(`star31: ${_.sum(versions)}`);
  });
}

export async function star32() {
  const input = await getInput(16).then((response) => {
    let i = response.inputArray;

    console.log(i);

    let answer = 0;
    console.log(`star32: ${answer}`);
  });
}
