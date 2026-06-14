<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <HelloWorld />
  <div class="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
    <div class="bg-slate-800 p-8 rounded-2xl shadow-2xl border border-slate-700 text-center max-w-md">
      <i class="fas fa-map-marked-alt text-5xl text-emerald-400 mb-4 animate-bounce"></i>
      
      <h1 class="text-3xl font-bold text-emerald-400 mb-2">
        Ambiente Pronto!
      </h1>
      
      <p class="text-slate-400 mb-6">
        Vue 3 + TypeScript + Tailwind v4 rodando perfeitamente dentro do Docker.
      </p>
    </div>
  </div>
</template>
