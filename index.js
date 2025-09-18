import { ChatGroq } from "@langchain/groq";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import readLine from "node:readline/promises";

/**
 * 1.Define  node function
 * 2. Build the graph
 * 3. Compile and invoke the graph
 */

/**  Initialise the LLM */
const llm = new ChatGroq({
  model: "openai/gpt-oss-120b",
  temperature: 0, // if increased like 1 then it becomes creative
  maxRetries: 2, // default is 2
  //also we didn't add here apiKey param because it is optional and automatically taken by Bun from .env file
});

async function callModel(state) {
  //call the LLM using APIS

  console.log("Calling LLM....");

  //invoking llm model and passing question within state.messages Array
  const response = await llm.invoke(state.messages);

  //concatenate means adding response inside messages array
  return { messages: [response] };
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
    // console.log("You said: ", userInput);

    if (userInput === "bye") break;

    const finalState = await app.invoke({
      messages: [{ role: "user", content: userInput }],
    });

    const lastMessage = finalState.messages[finalState.messages.length - 1];
    // console.log("Final->> ", finalState);
    console.log("AI:  ", lastMessage.content);
  }

  rl.close();
}

main();
