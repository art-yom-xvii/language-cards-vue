<template>
  <div
    class="w-full flex flex-col items-center bg-gray-900/80 rounded-3xl shadow-2xl p-4 sm:p-8 md:p-12 backdrop-blur-lg transition-colors duration-300 max-w-7xl mx-auto mt-4 mb-8 text-gray-100"
  >
    <div
      class="flex flex-col md:flex-row items-center justify-center w-full gap-8 md:gap-20 xl:gap-32 mb-10 min-h-[8.5em] max-w-full"
      style="width: 100%"
    >
      <div class="flex flex-col items-center flex-1 min-w-[0] w-full">
        <div class="flex items-center mb-2">
          <span class="text-3xl mr-2">{{ isReversed ? "🇬🇧" : "🇱🇻" }}</span>
          <span class="text-xl font-semibold text-gray-400">{{
            isReversed ? "English" : "Latvian"
          }}</span>
        </div>
        <div
          class="text-5xl md:text-6xl xl:text-7xl font-extrabold text-center break-words w-full min-h-[2.5em] flex items-center justify-center tracking-tight drop-shadow-lg"
        >
          {{ isReversed ? currentWord.en : currentWord.lv }}
        </div>
      </div>
      <div class="flex flex-col items-center flex-1 min-w-[0] w-full">
        <div class="flex items-center mb-2">
          <span class="text-3xl mr-2">{{ isReversed ? "🇱🇻" : "🇬🇧" }}</span>
          <span class="text-xl font-semibold text-gray-400">{{
            isReversed ? "Latvian" : "English"
          }}</span>
        </div>
        <div
          class="text-5xl md:text-6xl xl:text-7xl font-extrabold text-center break-words w-full min-h-[2.5em] flex items-center justify-center tracking-tight drop-shadow-lg"
        >
          <transition name="fade-slide">
            <span v-if="revealed">{{ isReversed ? currentWord.lv : currentWord.en }}</span>
            <span v-else style="opacity: 0">&nbsp;<!-- placeholder --></span>
          </transition>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center w-full gap-4 min-h-[8.5em] justify-center">
      <transition name="fade-slide" mode="out-in">
        <template v-if="!revealed">
          <div key="actions" class="flex flex-row gap-6 justify-center w-full">
            <button
              @click="reveal"
              class="w-32 h-20 px-8 py-4 rounded-xl border-2 border-blue-800 text-blue-200 font-bold text-2xl bg-gray-800/80 hover:bg-blue-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800 flex items-center justify-center"
            >
              <span class="block sm:hidden">Show</span>
              <span class="hidden sm:block">Show Translation</span>
            </button>
            <button
              @click="skipWord"
              class="w-32 h-20 px-8 py-4 rounded-xl border-2 border-gray-700 text-gray-200 font-bold text-2xl bg-gray-800/80 hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-gray-700 flex items-center justify-center"
            >
              <span class="block sm:hidden">Skip</span>
              <span class="hidden sm:block">Skip Word</span>
            </button>
          </div>
        </template>
        <template v-else>
          <div key="guess" class="flex flex-col items-center w-full gap-4">
            <!-- <div class="text-lg md:text-xl font-medium text-gray-200 mb-2">
              How was your guess? 🐹
            </div> -->
            <div class="flex flex-row gap-8 w-full justify-center mt-0">
              <button
                @click="guess(true)"
                class="w-32 h-20 flex flex-col items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-600 text-blue-200 font-bold text-4xl bg-gray-800/80 hover:bg-blue-900 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-800"
                aria-label="Guessed Correctly"
              >
                <span>✅</span>
                <span class="text-lg font-medium mt-1">Correct</span>
              </button>
              <button
                @click="guess(false)"
                class="w-32 h-20 flex flex-col items-center justify-center px-8 py-4 rounded-xl border-2 border-gray-600 text-red-300 font-bold text-4xl bg-gray-800/80 hover:bg-gray-700 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md focus:outline-none focus:ring-2 focus:ring-red-800"
                aria-label="Guessed Incorrectly"
              >
                <span>❌</span>
                <span class="text-lg font-medium mt-1">Incorrect</span>
              </button>
            </div>
          </div>
        </template>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, watch } from "vue";
import { categories } from "./words.js";

const $store = inject("store");
const isReversed = inject("isReversed");
const incorrectMode = inject("incorrectMode");
const revealed = ref(false);
const lastIndex = ref(-1);
const currentIndex = ref(-1);
const currentWord = ref({});

// For incorrect mode
const incorrectWords = ref([]);

const filteredWords = computed(() => {
  const catName = $store.state.selectedCategory || "All";
  const cat = categories.find((c) => c.name === catName);
  if (cat) return cat.words;
  const all = categories.find((c) => c.name === "All");
  return all ? all.words : categories[0]?.words || [];
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function getRandomIndex() {
  let arr = incorrectMode.value ? incorrectWords.value : filteredWords.value;
  let idx;
  do {
    idx = Math.floor(Math.random() * arr.length);
  } while (arr.length > 1 && idx === lastIndex.value);
  return idx;
}

function nextWord() {
  revealed.value = false;
  lastIndex.value = currentIndex.value;
  let arr = incorrectMode.value ? incorrectWords.value : filteredWords.value;
  currentIndex.value = getRandomIndex();
  currentWord.value = arr[currentIndex.value] || {};
}

function reveal() {
  revealed.value = true;
}

function guess(correct) {
  const key = currentWord.value.lv;
  const stats = { ...($store.state.stats[key] || { correct: 0, incorrect: 0 }) };
  if (correct) stats.correct++;
  else stats.incorrect++;
  $store.commit("updateStats", { [key]: stats });
  if (incorrectMode.value) {
    if (correct) {
      // Remove word from incorrectWords
      incorrectWords.value = incorrectWords.value.filter((w) => w.lv !== key);
    }
    // If all words are correct, reset
    if (incorrectWords.value.length === 0) {
      // Optionally show a message or reset
      incorrectMode.value = false;
    }
  }
  nextWord();
}

function skipWord() {
  nextWord();
}

onMounted(() => {
  // Always initialize incorrectWords and show a word on mount
  if (incorrectMode.value) {
    incorrectWords.value = shuffle([...filteredWords.value]);
    nextWord();
  } else {
    nextWord();
  }
  watch(
    () => incorrectMode.value,
    (val) => {
      if (val) {
        incorrectWords.value = shuffle([...filteredWords.value]);
        nextWord();
      } else {
        incorrectWords.value = [];
        nextWord();
      }
    }
  );
});

watch(
  () => $store.state.selectedCategory,
  () => {
    // Reset selection when category changes
    lastIndex.value = -1;
    currentIndex.value = -1;
    incorrectMode.value = true;
    incorrectWords.value = shuffle([...filteredWords.value]);
    nextWord();
  }
);
</script>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1),
    transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}
.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}
</style>
