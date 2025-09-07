import { createApp, reactive } from "vue";
import App from "./App.vue";
import router from "./router";
import "./index.css";

// Simple store for dark mode and stats
const store = {
  state: reactive({
    darkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
    stats: {},
    selectedCategory: "All",
  }),
  commit(action, payload) {
    if (action === "toggleDarkMode") {
      this.state.darkMode = !this.state.darkMode;
      localStorage.setItem("darkMode", this.state.darkMode);
    }
    if (action === "updateStats") {
      this.state.stats = { ...this.state.stats, ...payload };
      localStorage.setItem("stats", JSON.stringify(this.state.stats));
    }
    if (action === "setStats") {
      this.state.stats = payload;
    }
    if (action === "setCategory") {
      this.state.selectedCategory = payload;
      localStorage.setItem("selectedCategory", this.state.selectedCategory);
    }
  },
};

// Load persisted state
const savedDark = localStorage.getItem("darkMode");
if (savedDark !== null) store.state.darkMode = savedDark === "true";
const savedStats = localStorage.getItem("stats");
if (savedStats) store.state.stats = JSON.parse(savedStats);
const savedCategory = localStorage.getItem("selectedCategory");
if (savedCategory) store.state.selectedCategory = savedCategory;

const app = createApp(App);
app.provide("store", store);
app.use(router);
app.mount("#app");
