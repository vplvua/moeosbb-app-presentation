<script setup>
import { useNav } from '@slidev/client'

const { currentPage, total, next, prev, go, isPrintMode } = useNav()
</script>

<template>
  <nav v-if="!isPrintMode && ['none', 'slide'].includes($renderContext)" class="deck-nav">
    <button class="nb" title="На початок" :disabled="currentPage === 1" @click="go(1)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
    </button>
    <button class="nb" title="Назад" :disabled="currentPage === 1" @click="prev">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
    </button>
    <span class="pos">{{ currentPage }} / {{ total }}</span>
    <button class="nb" title="Вперед" :disabled="currentPage === total" @click="next">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
    </button>
  </nav>
</template>

<style scoped>
.deck-nav {
  position: absolute;
  right: 32px;
  bottom: 28px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 16px;
  border-radius: 999px;
  background: rgba(23, 22, 43, .5);
  backdrop-filter: blur(8px);
  color: #F2F1FA;
  font-family: 'Inter', system-ui, sans-serif;
  opacity: .45;
  transition: opacity .2s;
}
.deck-nav:hover { opacity: 1; }
.pos {
  font-size: 24px;
  line-height: 1;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  padding: 0 8px;
  white-space: nowrap;
}
.nb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  cursor: pointer;
}
.nb:hover:not(:disabled) { background: rgba(242, 241, 250, .16); }
.nb:disabled { opacity: .3; cursor: default; }
.nb svg { width: 26px; height: 26px; }
@media print {
  .deck-nav { display: none; }
}
</style>
