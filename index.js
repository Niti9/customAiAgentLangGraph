import readLine from "node:readline/promises";

async function main() {
  // Created Interface for input and output of chat
  const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    const userInput = await rl.question("You:");
    console.log("You said: ", userInput);

    if (userInput === "bye") break;
  }

  rl.close();
}

main();
