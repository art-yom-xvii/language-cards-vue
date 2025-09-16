<template>
  <div class="relative inline-block text-left">
    <button
      @click="toggleMenu"
      class="inline-flex justify-center items-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      :aria-expanded="open.toString()"
      aria-haspopup="true"
      aria-label="Menu toggle"
    >
      <svg
        v-if="!open"
        class="w-6 h-6 text-gray-200"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <svg
        v-else
        class="w-6 h-6 text-gray-200"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
    <transition name="fade-slide">
      <div
        v-if="open"
        id="burger-menu-dropdown"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-xl shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
      >
        <div class="py-2 flex flex-col gap-1">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
const open = ref(false);
function toggleMenu() {
  open.value = !open.value;
}
function closeMenu() {
  open.value = false;
}

function handleClickOutside(event) {
  const menu = document.getElementById("burger-menu-dropdown");
  if (open.value && menu && !menu.contains(event.target)) {
    closeMenu();
  }
}
onMounted(() => {
  document.addEventListener("mousedown", handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener("mousedown", handleClickOutside);
});
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(-8px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
