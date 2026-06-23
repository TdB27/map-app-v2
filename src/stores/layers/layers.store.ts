// stores/layers/layers.store.ts
import { defineStore } from 'pinia';
import { markRaw } from 'vue'
import type QcLayersInterface from './layers';

export const useLayersStore = defineStore('layers', {
    state: (): { LAYERS_STATE: Array<any> } => ({
        LAYERS_STATE: []
    }),
    actions: {
        LAYERS_DISPATCH(payload: QcLayersInterface) {

            if (payload.layerWms) {
                payload.layerWms = markRaw(payload.layerWms);
            }

            this.LAYERS_STATE.push(payload);
        },

        REMOVE_LAYER_DISPATCH(layerName: string) {
            const index = this.LAYERS_STATE.findIndex(itemLayer => itemLayer.layerName === layerName)
            this.LAYERS_STATE.splice(index, -1)
        },

        REMOVE_ALL_LAYERS_DISPATCH() {
            this.LAYERS_STATE = []
        },
    },
});