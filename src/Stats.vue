<template>
  <div
    class="bg-gray-900/80 rounded-3xl p-8 md:p-12 shadow-2xl backdrop-blur-lg w-full max-w-2xl mx-auto mt-4 mb-8 text-gray-100"
  >
    <h2 class="text-2xl md:text-3xl font-extrabold mb-6 text-center tracking-tight drop-shadow-sm">
      Stats
    </h2>
    <div v-if="statsArr.length" class="overflow-x-auto">
      <table class="min-w-full text-lg md:text-xl rounded-xl overflow-hidden">
        <thead>
          <tr class="bg-gray-800">
            <th
              class="px-4 py-2 text-left font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
              @click="sortBy('lv')"
            >
              Word
              <span v-if="sortKey === 'lv'" class="ml-1">{{
                sortOrder === "asc" ? "↑" : "↓"
              }}</span>
            </th>
            <th
              class="px-4 py-2 text-center font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
              @click="sortBy('incorrect')"
            >
              ❌
              <span v-if="sortKey === 'incorrect'" class="ml-1">{{
                sortOrder === "asc" ? "↑" : "↓"
              }}</span>
            </th>
            <th
              class="px-4 py-2 text-center font-semibold cursor-pointer hover:bg-gray-700 transition-colors"
              @click="sortBy('correct')"
            >
              ✅
              <span v-if="sortKey === 'correct'" class="ml-1">{{
                sortOrder === "asc" ? "↑" : "↓"
              }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="row in sortedStatsArr"
            :key="row.lv"
            :class="[
              'transition-all',
              'hover:bg-gray-800',
              row.lv === mostGuessed.lv ? 'font-bold' : '',
              row.lv === leastGuessed.lv ? 'italic' : '',
            ]"
          >
            <td class="px-4 py-2 font-semibold">
              <span>{{ row.lv }}</span>
            </td>
            <td class="px-4 py-2 text-center">{{ row.incorrect }}</td>
            <td class="px-4 py-2 text-center">{{ row.correct }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="text-gray-400 mt-4 text-center text-lg">No stats yet.</div>
  </div>
</template>

<script setup>
import { computed, inject, ref } from "vue";
const $store = inject("store");
const sortKey = ref("incorrect");
const sortOrder = ref("desc");

const stats = computed(() => $store.state.stats);
const statsArr = computed(() => {
  return Object.entries(stats.value).map(([lv, s]) => {
    const total = s.correct + s.incorrect;
    return {
      lv,
      correct: s.correct,
      incorrect: s.incorrect,
      total,
    };
  });
});

const sortedStatsArr = computed(() => {
  const arr = [...statsArr.value];
  arr.sort((a, b) => {
    if (sortKey.value === "lv") {
      return sortOrder.value === "asc" ? a.lv.localeCompare(b.lv) : b.lv.localeCompare(a.lv);
    } else {
      const aVal = a[sortKey.value];
      const bVal = b[sortKey.value];
      return sortOrder.value === "asc" ? aVal - bVal : bVal - aVal;
    }
  });
  return arr;
});

const mostGuessed = computed(() => {
  const arr = [...statsArr.value];
  return arr.sort((a, b) => b.total - a.total)[0] || {};
});

const leastGuessed = computed(() => {
  const arr = [...statsArr.value];
  return arr.length > 1 ? arr.sort((a, b) => b.total - a.total)[arr.length - 1] : {};
});

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
  } else {
    sortKey.value = key;
    sortOrder.value = key === "lv" ? "asc" : "desc";
  }
};
</script>
