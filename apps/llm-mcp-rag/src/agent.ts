import { ChatOpenAI } from "./chat-openai";
import { MCPClient } from "./mcp-client";
import { logTitle } from "./utils";

class Agent {
    private model: string;
    private mcpClients: MCPClient[];
    private systemPrompt: string;
    private context: string;

    private llm: ChatOpenAI | null = null;
    constructor(
        model: string,
        mcpClients: MCPClient[],
        systemPrompt: string = "",
        context: string = ""
    ) {
        this.model = model;
        this.mcpClients = mcpClients;
        this.systemPrompt = systemPrompt;
        this.context = context;
    }

    async initialize() {
        logTitle("INITIALIZE TOOLS AND LLM");
        for (const mcpClient of this.mcpClients) {
            await mcpClient.initialize();
        }
        const tools = this.mcpClients.flatMap((mcpClient) =>
            mcpClient.getTools()
        );
        this.llm = new ChatOpenAI(
            this.model,
            this.systemPrompt,
            tools,
            this.context
        );
        logTitle("INITIALIZE TOOLS AND LLM");
    }

    public async close() {
        for await (const client of this.mcpClients) {
            await client.close();
        }
    }

    async invoke(prompt: string) {
        if (!this.llm) {
            throw new Error("LLM not initialized");
        }
        let response = await this.llm.chat(prompt);
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (response.toolCalls.length > 0) {
                for (const toolCall of response.toolCalls) {
                    const mcp = this.mcpClients.find((mcpClient) =>
                        mcpClient
                            .getTools()
                            .find((t) => t.name === toolCall.function.name)
                    );
                    if (mcp) {
                        logTitle("TOOL USE");
                        console.log("tool name: ", toolCall.function.name);
                        console.log("tool args: ", toolCall.function.arguments);
                        const result = await mcp.callTool(
                            toolCall.function.name,
                            JSON.parse(toolCall.function.arguments)
                        );
                        console.log("tool result: ", JSON.stringify(result));
                        this.llm.appendToolResult(
                            toolCall.id,
                            JSON.stringify(result)
                        );
                    } else {
                        this.llm.appendToolResult(
                            toolCall.id,
                            `Sorry, I don't know how to do ${toolCall.function.name}`
                        );
                    }
                }
                response = await this.llm.chat();
                continue;
            }
            await this.close();
            return response.content;
        }
    }
}

export { Agent };
