import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import readLine from "node:readline/promises";

/**
 * 1.Define  node function
 * 2. Build the graph
 * 3. Compile and invoke the graph
 */

function callModel(state) {
  //call the LLM using APIS

  console.log("Calling LLM....");
  return state;
}

/** Build the Graph */
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addEdge("__start__", "agent")
  .addEdge("agent", "__end__");

/** Compile the Graph */
const app = workflow.compile();

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

    const finalState = await app.invoke({
      messages: [{ role: "user", content: userInput }],
    });
    console.log("Final->> ", finalState);
  }

  rl.close();
}

main();
