import App from "@/App.vue";
import "@/style.css";
import { createApp } from "vue";

import { TButton, create } from "@ts-general-toolset-monorepo/vue-components";
import "@ts-general-toolset-monorepo/vue-components/style.css";
const createUI = create({
    components: [TButton],
});

const app = createApp(App);
app.use(createUI);
app.mount("#app");
