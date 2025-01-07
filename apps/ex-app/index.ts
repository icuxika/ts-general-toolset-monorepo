#!/usr/bin/env node

import { add, timeoutPerformTasks } from "@ts-general-toolset-monorepo/utils";
import prompts from "prompts";

(function () {
    console.log("sum: ", add(1, 2));
})();

const drawProgressBar = (progress: number) => {
    const barWidth = 30;
    const filledWidth = Math.floor((progress / 100) * barWidth);
    const emptyWidth = barWidth - filledWidth;
    const progressBar =
        "\u2588".repeat(filledWidth) + "\u2591".repeat(emptyWidth);
    return `[${progressBar}] ${progress}%`;
};

(async () => {
    const response = await prompts([
        {
            type: "text",
            name: "twitter",
            message: "What's your twitter handle?",
        },
        {
            type: "multiselect",
            name: "color",
            message: "Pick colors",
            choices: [
                { title: "Red", value: "#ff0000" },
                { title: "Green", value: "#00ff00" },
                { title: "Blue", value: "#0000ff" },
            ],
        },
    ]);

    console.log(response);
    const tasks = Array.from({ length: 10 }, (_, i) => () => {
        const progressPercentage = Math.floor(((i + 1) / 10) * 100);
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write(
            `Progress: ${drawProgressBar(progressPercentage)} ${i}`
        );
    });
    timeoutPerformTasks(tasks);
})();
