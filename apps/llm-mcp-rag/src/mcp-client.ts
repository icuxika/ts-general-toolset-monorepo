import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { Tool } from "@modelcontextprotocol/sdk/types.js";

class MCPClient {
    private mcp: Client;
    private transport: StdioClientTransport | null = null;
    private tools: Tool[] = [];

    private command: string;
    private args: string[];

    constructor(
        name: string,
        command: string,
        args: string[],
        version?: string
    ) {
        this.mcp = new Client({ name, version: version || "1.0.0" });
        this.command = command;
        this.args = args;
    }

    public async initialize() {
        await this.connectToServer();
    }

    public callTool(name: string, args: Record<string, unknown>) {
        return this.mcp.callTool({
            name,
            arguments: args,
        });
    }

    public getTools() {
        return this.tools;
    }

    private async connectToServer() {
        try {
            this.transport = new StdioClientTransport({
                command: this.command,
                args: this.args,
            });
            await this.mcp.connect(this.transport);

            const toolsResult = await this.mcp.listTools();
            this.tools = toolsResult.tools.map((tool) => {
                return {
                    name: tool.name,
                    description: tool.description,
                    inputSchema: tool.inputSchema,
                };
            });
            console.log(
                "Connected to server with tools:",
                this.tools.map(({ name }) => name)
            );
        } catch (e) {
            console.log("Failed to connect to MCP server: ", e);
            throw e;
        }
    }

    public async close() {
        await this.mcp.close();
    }
}

export { MCPClient };
