import { ChatGroq } from "@langchain/groq";
import { MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import readLine from "node:readline/promises";
import { TavilySearch } from "@langchain/tavily";
import { MemorySaver } from "@langchain/langgraph";

//Not Good for Production we required Database in production because it cleans when server down
const checkpointer = new MemorySaver();

const tool = new TavilySearch({
  maxResults: 3,
  topic: "general",
  // includeAnswer: false,
  // includeRawContent: false,
  // includeImages: false,
  // includeImageDescriptions: false,
  // searchDepth: "basic",
  // timeRange: "day",
  // includeDomains: [],
  // excludeDomains: [],
});

/***
 * Initialize the Tool node
 */
const tools = [tool];
const toolNode = new ToolNode(tools);

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
}).bindTools(tools);

async function callModel(state) {
  //call the LLM using APIS

  console.log("Calling LLM....");

  //invoking llm model and passing question within state.messages Array
  const response = await llm.invoke(state.messages);

  //concatenate means adding response inside messages array
  return { messages: [response] };
}

function shouldContinue(state) {
  //put your condition
  //wheather to call a tool or end

  const lastMessage = state.messages[state.messages.length - 1];

  console.log("state is ", state);
  if (lastMessage.tool_calls.length > 0) {
    return "tools";
  }
  return "_end_";
}

/** Build the Graph */
const workflow = new StateGraph(MessagesAnnotation)
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addEdge("tools", "agent")
  .addConditionalEdges("agent", shouldContinue);

/** Compile the Graph */
const app = workflow.compile({ checkpointer });

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

    const finalState = await app.invoke(
      {
        messages: [{ role: "user", content: userInput }],
      },
      { configurable: { thread_id: "1" } } // thread Id is like conversation id for now it's hardcoded
    );

    const lastMessage = finalState.messages[finalState.messages.length - 1];
    // console.log("Final->> ", finalState);
    console.log("AI:  ", lastMessage.content);
  }

  rl.close();
}

main();
