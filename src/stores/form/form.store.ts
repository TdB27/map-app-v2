// stores/form/form.store.ts
import { defineStore } from 'pinia';
import type QcFormInterface from './form';

// https://medium.com/@denis.ibanez.gdl/uma-estrutura-completa-com-vue3-parte-v-73cda36ab669

export const useFormStore = defineStore('form', {
	// state: () => ({
	state: (): { FORM_STATE: QcFormInterface; CLEAR_FORM_STATE: boolean } => ({
		FORM_STATE: {
			linkWms: null
		},
		CLEAR_FORM_STATE: false
	}),
	actions: {
		FORM_DISPATCH(payload: QcFormInterface) {
			this.FORM_STATE = payload;
		},

		CLEAR_FORM() {
			this.FORM_DISPATCH({ 
				linkWms: null
			})
		},

		CLEAR_FORM_DISPATCH() {
			this.CLEAR_FORM()
			this.CLEAR_FORM_STATE = !this.CLEAR_FORM_STATE;
		},
	},
});