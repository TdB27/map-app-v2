<script setup lang="ts">
import { BIconChevronDown } from 'bootstrap-icons-vue'

import { storeToRefs } from 'pinia';
import { useLayersStore } from '@/stores/layers/layers.store';
const { LAYERS_STATE } = storeToRefs(useLayersStore());

</script>

<template>
    <section class="flex flex-col gap-2" v-if="LAYERS_STATE.length">

        <div class="max-w-sm rounded-lg overflow-hidden shadow-md bg-white border border-slate-200 transition-all hover:shadow-lg">                
            <h4 class="text-2xl text-center py-2">Camadas ativas</h4>
        </div>

        <div class="flex flex-col gap-1">
            <div class="max-w-md space-y-2">
  
                <!-- Accordion -->
                <template v-for="(l, key) in LAYERS_STATE" :key="key">
                    <!-- <details class="group border border-gray-200 rounded-lg bg-white overflow-hidden [&_summary::-webkit-details-marker]:hidden" open> -->
                    <details name="accordion" class="group border border-gray-200 rounded-lg bg-white overflow-hidden [&_summary::-webkit-details-marker]:hidden">
      
                        <summary class="flex items-center justify-between p-4 bg-gray-50 cursor-pointer select-none hover:bg-gray-100 transition-colors">
                            <strong class="font-medium text-slate-600">Camada: {{l.layerName}}</strong>
                            
                            <!-- animated arrow -->
                            <BIconChevronDown class="w-4 h-4 text-gray-500 transition-transform duration-300 group-open:rotate-180" />
                        </summary>

                        <!-- Conteúdo (Resposta) -->
                        <div class="p-4 border-t border-gray-100 text-sm text-gray-600 leading-relaxed animate-fadeIn flex flex-col gap-2">
                            <span><strong>Base URL:</strong> {{ l.urlBase }}</span>
                            <span><strong>Workspace:</strong> {{ l.workspace }}</span>
                            <span><strong>Camada:</strong> {{ l.layerName }}</span>
                        </div>
                    </details>
                </template>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>

section {
    max-width: 400px;
    width: 100%;
    padding: 1rem;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 900;
}

</style>