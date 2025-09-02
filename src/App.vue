<script setup>
import { ref, provide, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const isReversed = ref(false);

const goBack = () => {
  if (window.history.length > 1) router.back();
  else router.push("/");
};

const toggleLanguageDirection = () => {
  isReversed.value = !isReversed.value;
  localStorage.setItem("languageDirection", isReversed.value ? "reversed" : "normal");
};

onMounted(() => {
  const savedDirection = localStorage.getItem("languageDirection");
  if (savedDirection === "reversed") {
    isReversed.value = true;
  }
});

provide("isReversed", isReversed);
provide("toggleLanguageDirection", toggleLanguageDirection);
</script>

<template>
  <div
    :class="[
      'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-gray-100',
      'min-h-screen flex flex-col items-center justify-center transition-colors duration-300',
    ]"
  >
    <div class="w-full max-w-7xl mx-auto p-4 flex flex-col items-center">
      <header
        class="w-full flex justify-between items-center mb-8 rounded-2xl shadow-xl bg-gray-900/80 backdrop-blur-md px-6 py-4 sticky top-0 z-10"
      >
        <h1 class="text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-sm break-words">
          <span class="block sm:hidden">Mācāmies 🐹</span>
          <span class="hidden sm:block">Mācāmies latviešu valodu 🐹</span>
        </h1>
        <div class="flex items-center gap-2">
          <template v-if="route.path === '/'">
            <button
              @click="toggleLanguageDirection"
              class="p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              :title="isReversed ? 'Switch to Latvian → English' : 'Switch to English → Latvian'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M329.4 169.4L425.4 73.4C437.9 60.9 458.2 60.9 470.7 73.4L566.7 169.4C579.2 181.9 579.2 202.2 566.7 214.7C554.2 227.2 533.9 227.2 521.4 214.7L480 173.3L480 288L544 288C561.7 288 576 302.3 576 320C576 337.7 561.7 352 544 352L224 352L224 466.7L265.4 425.3C277.9 412.8 298.2 412.8 310.7 425.3C323.2 437.8 323.2 458.1 310.7 470.6L214.7 566.6C202.2 579.1 181.9 579.1 169.4 566.6L73.4 470.6C60.9 458.1 60.9 437.8 73.4 425.3C85.9 412.8 106.2 412.8 118.7 425.3L160 466.7L160 352L96 352C78.3 352 64 337.7 64 320C64 302.3 78.3 288 96 288L416 288L416 173.3L374.6 214.7C362.1 227.2 341.8 227.2 329.3 214.7C316.8 202.2 316.8 181.9 329.3 169.4zM480 400L480 544C480 561.7 465.7 576 448 576C430.3 576 416 561.7 416 544L416 400L480 400zM160 240L160 96C160 78.3 174.3 64 192 64C209.7 64 224 78.3 224 96L224 240L160 240z"
                />
              </svg>
            </button>
          </template>
          <template v-if="route.path === '/'">
            <router-link
              to="/stats"
              class="px-3 py-2 rounded-lg border border-transparent bg-gray-800/80 text-blue-300 font-semibold shadow-sm hover:bg-blue-900 hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >Stats</router-link
            >
          </template>
          <template v-else-if="route.path === '/stats'">
            <button
              @click="goBack"
              class="px-3 py-2 rounded-lg border border-transparent bg-gray-800/80 text-gray-200 font-semibold shadow-sm hover:bg-gray-700 hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 flex items-center gap-1"
            >
              <span class="text-lg">←</span> Back
            </button>
          </template>
        </div>
      </header>
      <router-view />
    </div>
  </div>
</template>

<style>
body {
  @apply bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700;
}
</style>
