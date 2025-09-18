# Install bun in this project , I did globally

npm install -g bun

# Initialize project by bun

bun init

# select Library then enter then use name index.js for javascript

# run index.js by

bun run index.js

<!-- We will use 'readLine (built-in Node.js module)
 To do chat in terminal -->

# Adding Ai Agents (LangChain-LangGraph)

# Install Langchain-langraph

<!-- website for reference  also it will deprecated soon
https://langchain-ai.github.io/langgraphjs/tutorials/quickstart/?ajs_aid=65df6784-3281-42c9-8ce2-aaf943e22201
 -->

bun add @langchain/core @langchain/langgraph

# Install chat groq , so we can use models given by groq website

<!-- reference website
https://js.langchain.com/docs/integrations/chat/groq/
 -->

bun add @langchain/groq

# created .env file

<!-- add credential for GROQ_API_KEY
by doing signup in groq website
and then generate an api key and use in .env file-->

<!-- We don't need to add .env file into bun
because bun automatically does when we start the bun
(bun run index.js)  -->
<!-- But if we use node index.js setup then we required this command in terminal
( node --env-file=.env index.js ) -->

<!-- We were Getting Response like this  -->

Final->> {
messages: [
HumanMessage {
"id": "366f30ef-a1d3-468d-802a-afb0d8222e47",  
 "content": "Hello ",
"additional_kwargs": {},
"response_metadata": {}
}, AIMessage {
"id": "2e15533a-b6ff-4899-a602-d88ae0e5bf8b",  
 "content": "Hello! How can I assist you today?",  
 "additional_kwargs": {},
"response_metadata": {
"tokenUsage": {
"completionTokens": 39,
"promptTokens": 73,
"totalTokens": 112
},
"finish_reason": "stop",
"id": "chatcmpl-4d7d600d-acdc-4d81-bb1a-6de2708d4096",
"object": "chat.completion",
"created": 1758191171,
"model": "openai/gpt-oss-120b",
"usage": {
"queue_time": 0.054186996,
"prompt_tokens": 73,
"prompt_time": 0.002651023,
"completion_tokens": 39,
"completion_time": 0.07755767,
"total_tokens": 112,
"total_time": 0.080208693
},
"usage_breakdown": null,
"system_fingerprint": "fp_82669fd91d",
"x_groq": {
"id": "req_01k5e5rd9efza9bpjqd2ss03zx"
},
"service_tier": "on_demand"
},
"tool_calls": [],
"invalid_tool_calls": [],
"usage_metadata": {
"input_tokens": 73,
"output_tokens": 39,
"total_tokens": 112
}
}
],
}
