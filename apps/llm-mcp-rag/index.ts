#!/usr/bin/env node

import { add } from "@ts-general-toolset-monorepo/utils";
import "dotenv/config";
import fs from "fs";
import path from "path";
import { Agent } from "./src/agent";
import { EmbeddingRetriever } from "./src/embedding-retriever";
import { MCPClient } from "./src/mcp-client";
import { logTitle } from "./src/utils";

async function retrieveContext(input: string) {
    const embeddingRetriever = new EmbeddingRetriever("text-embedding-v3");
    const knowledgeDir = path.join(process.cwd(), "knowledge");
    const files = fs.readdirSync(knowledgeDir);
    for await (const file of files) {
        const content = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
        await embeddingRetriever.embedDocument(content);
    }
    const context = (await embeddingRetriever.retrieve(input, 3)).join("\n");
    logTitle("CONTEXT");
    console.log(context);
    return context;
}

(async () => {
    console.log("sum: ", add(1, 2));

    const currentDir = process.cwd();
    const filesystemMCP = new MCPClient("filesystem", "npx", [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        currentDir,
    ]);

    const tavilyMCP = new MCPClient("tavily-mcp", "npx", [
        "-y",
        "tavily-mcp@0.1.4",
    ]);

    const outputPath = path.join(currentDir, "output");

    const input = `从context中找到用户余克的相关信息，搜索一下用户所处地点天气情况，总结创作一个关于他的故事，把他的信息和故事保存到${outputPath}的story.txt文件中`;
    const context = await retrieveContext(input);

    const agent = new Agent(
        "deepseek-chat",
        [filesystemMCP, tavilyMCP],
        "",
        context
    );
    await agent.initialize();
    const response = await agent.invoke(input);
    console.log(response);
})();
