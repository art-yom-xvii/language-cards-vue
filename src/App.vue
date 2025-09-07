<script setup>
import { ref, provide, onMounted, inject, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { categories } from "./words.js";
const route = useRoute();
const router = useRouter();
const isReversed = ref(false);
const showCategories = ref(false);
const $store = inject("store");

const categoryNames = computed(() => categories.map((c) => c.name));
const selectedCategory = computed(() => $store.state.selectedCategory || "All");

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
          <span class="block sm:hidden">🐹</span>
          <span class="hidden sm:block">Mācāmies latviešu valodu 🐹</span>
        </h1>
        <div class="flex items-center gap-2">
          <template v-if="route.path === '/'">
            <button
              @click="showCategories = true"
              class="p-2 rounded-lg text-gray-300 hover:bg-gray-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              :title="`Choose category (current: ${selectedCategory})`"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M104 112C90.7 112 80 122.7 80 136L80 184C80 197.3 90.7 208 104 208L152 208C165.3 208 176 197.3 176 184L176 136C176 122.7 165.3 112 152 112L104 112zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM80 296L80 344C80 357.3 90.7 368 104 368L152 368C165.3 368 176 357.3 176 344L176 296C176 282.7 165.3 272 152 272L104 272C90.7 272 80 282.7 80 296zM104 432C90.7 432 80 442.7 80 456L80 504C80 517.3 90.7 528 104 528L152 528C165.3 528 176 517.3 176 504L176 456C176 442.7 165.3 432 152 432L104 432z"
                />
              </svg>
            </button>
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
              class="p-2 rounded-lg border border-transparent bg-gray-800/80 text-blue-300 font-semibold shadow-sm hover:bg-blue-900 hover:border-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
              :title="'Stats'"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                class="w-6 h-6 fill-current"
              >
                <path
                  d="M512.4 240l-176 0c-17.7 0-32-14.3-32-32l0-176c0-17.7 14.4-32.2 31.9-29.9 107 14.2 191.8 99 206 206 2.3 17.5-12.2 31.9-29.9 31.9zM222.6 37.2c18.1-3.8 33.8 11 33.8 29.5l0 197.3c0 5.6 2 11 5.5 15.3L394 438.7c11.7 14.1 9.2 35.4-6.9 44.1-34.1 18.6-73.2 29.2-114.7 29.2-132.5 0-240-107.5-240-240 0-115.5 81.5-211.9 190.2-234.8zM477.8 288l64 0c18.5 0 33.3 15.7 29.5 33.8-10.2 48.4-35 91.4-69.6 124.2-12.3 11.7-31.6 9.2-42.4-3.9L374.9 340.4c-17.3-20.9-2.4-52.4 24.6-52.4l78.2 0z"
                />
              </svg>
            </router-link>
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
      <transition name="fade-slide">
        <div v-if="showCategories" class="fixed inset-0 z-20 flex items-center justify-center">
          <div class="absolute inset-0 bg-black/50" @click="showCategories = false"></div>
          <div class="relative z-30 bg-gray-900 rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-xl font-bold">Choose Category</h3>
              <button @click="showCategories = false" class="text-gray-300 hover:text-white">
                ✕
              </button>
            </div>
            <div class="max-h-80 overflow-y-auto divide-y divide-gray-800">
              <button
                v-for="name in categoryNames"
                :key="name"
                @click="
                  $store.commit('setCategory', name);
                  showCategories = false;
                "
                :class="[
                  'w-full text-left px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors',
                  name === selectedCategory
                    ? 'bg-gray-800 text-blue-300 font-semibold'
                    : 'text-gray-200',
                ]"
              >
                {{ name }}
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700;
}
</style>
