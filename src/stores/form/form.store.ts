// stores/form/form.store.ts
import { defineStore } from 'pinia';
import type QcFormInterface from './form';

// https://medium.com/@denis.ibanez.gdl/uma-estrutura-completa-com-vue3-parte-v-73cda36ab669

export const useFormStore = defineStore('form', {
  state: () => ({
    FORM_STATE: {
        linkWms: ''
    }
  }),
  actions: {
    FORM_DISPATCH(payload: QcFormInterface) {
        this.FORM_STATE = payload;
    },
  },
});