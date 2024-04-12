#!/usr/bin/env node

import { add } from "@ts-general-toolset-monorepo/utils";
import prompts from "prompts";

(function () {
    console.log("sum: ", add(1, 2));
})();

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
})();
