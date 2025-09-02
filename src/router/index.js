import { createRouter, createWebHistory } from "vue-router";
import Flashcard from "../Flashcard.vue";
import Stats from "../Stats.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Flashcard },
    { path: "/stats", component: Stats },
  ],
});

export default router;
