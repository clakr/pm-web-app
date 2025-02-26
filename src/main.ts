import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "~/App.vue";
import "~/global.css";
import { router } from "~/router";

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount("#app");
