export function parsePacket(
  context: { binary: string },
  packetsToParse = -1
): number[] {
  const result: number[] = [];
  while (context.binary.length > 6 && packetsToParse !== 0) {
    // first three bits are the packet version
    const versionString = context.binary.substring(0, 3);
    const version = parseInt(versionString, 2);
    // next three bits are the packet type
    const typeString = context.binary.substring(3, 6);
    const type = parseInt(typeString, 2);
    // skip past the header
    context.binary = context.binary.substring(6);
    // if it's a litteral value then start extracting the value
    if (type === 4) {
      let value = "";
      let isDone = false;
      while (!isDone) {
        value += context.binary.substring(1, 5);
        isDone = context.binary[0] === "0";
        context.binary = context.binary.substring(5);
      }
      // this is the result
      result.push(parseInt(value, 2));
    } else {
      let children: number[] = [];
      // operator packet
      if (context.binary[0] === "0") {
        // if next bit is 0 then read the next 15 bits to get the length in bits of the subpackets
        // skip past the length string
        const lengthString = context.binary.substring(1, 16);
        const length = parseInt(lengthString, 2);
        context.binary = context.binary.substring(16);
        const subPackets = context.binary.substring(0, length);
        children = parsePacket({ binary: subPackets });
        context.binary = context.binary.substring(length);
      } else {
        // if next bit is 1 then read the next 11 bits to get the number of packets
        const lengthString = context.binary.substring(1, 12);
        const packets = parseInt(lengthString, 2);
        context.binary = context.binary.substring(12);
        children = parsePacket(context, packets);
      }
      switch (type) {
        case 0:
          result.push(children.reduce((acc, packet) => acc + packet, 0));
          break;
        case 1:
          result.push(children.reduce((acc, packet) => acc * packet, 1));
          break;
        case 2:
          result.push(Math.min(...children));
          break;
        case 3:
          result.push(Math.max(...children));
          break;
        case 5:
          if (children[0] > children[1]) {
            result.push(1);
          } else {
            result.push(0);
          }
          break;
        case 6:
          if (children[0] < children[1]) {
            result.push(1);
          } else {
            result.push(0);
          }
          break;
        case 7:
          if (children[0] === children[1]) {
            result.push(1);
          } else {
            result.push(0);
          }
          break;
        default:
          console.error("Unknown packet function", type);
      }
    }
    packetsToParse--;
  }
  return result;
}
