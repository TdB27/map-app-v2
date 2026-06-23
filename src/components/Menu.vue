<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BIconCardList, BIconXLg } from 'bootstrap-icons-vue'
import ButtonsMenu from "./ButtonsMenu.vue"

import { useFormStore } from '@/stores/form/form.store';
const { FORM_DISPATCH, CLEAR_FORM_DISPATCH } = useFormStore()
import type QcFormInterface from '@/stores/form/form';

import vSelect from 'vue-select'

const fieldsDefault: QcFormInterface = {
    linkWms: null
}

const form = ref<QcFormInterface>({...fieldsDefault})

const resetForm = () => {
    form.value = { ...fieldsDefault }
}

onMounted(() => resetForm())

const options = [
    { key: 'linkWms', label: 'Link WMS'}
]

const selectedOption = ref<string | null>(null)

const handleSubmit = () => {
    const form_ = { ...form.value }
    FORM_DISPATCH(form_)
}

const menuLgActived = ref<boolean>(false)

const openMenu = () => {
    menuLgActived.value = true
}

const closeMenu = () => {
    menuLgActived.value = false
}

const menuAction = (action: string) => {
    if(action === 'menuLgActived') {
        openMenu()
        return
    }

    if(action === 'clearMap') {
        CLEAR_FORM_DISPATCH()
        return
    }
}

</script>

<template>
    <ButtonsMenu :menuLgActived="menuLgActived" @dispatchMenuAction="menuAction" />

    <div class="menu-custom h-full flex flex-col" :class="{'show': menuLgActived}">
        <div class="grow relative">

            <button type="button" class="absolute close-menu flex items-center justify-center text-white bg-red-600 hover:bg-red-700 duration-100 transition cursor-pointer"
                @click="closeMenu">
                <BIconXLg class="text-2xl" />
            </button>

            <div class="h-full blur-custom p-6 overflow-y-auto">
                <!-- Título do Menu -->
                <h2 class="text-2xl font-bold text-gray-900 mb-6 flex gap-2 items-center">
                    <BIconCardList />
                    Formulário
                </h2>

                <!-- Formulário Customizado -->
                <form @submit.prevent="handleSubmit" class="space-y-6">

                    <div class="max-w-sm">                        
                        <v-select v-model="selectedOption" :options="options" :reduce="(option: any) => option.key"
                            class="text-base text-gray-900 bg-white border border-gray-300 rounded-lg" 
                            placeholder="Selecione uma opção"/>
                    </div>

                    <template v-if="selectedOption === 'linkWms'">
                        <div>
                            <label for="message" class="block text-sm font-medium text-gray-900 mb-2">
                                Cole o Link WMS abaixo
                            </label>
                            <textarea
                                id="message"
                                v-model="form.linkWms"
                                placeholder="Link..."
                                rows="4"
                                class="w-full px-4 py-2 text-base text-gray-900 placeholder-gray-400 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 resize-none break-keep">
                            </textarea>
                        </div>
                    </template>

                    <!-- Botão Submit -->
                    <button type="submit" v-if="selectedOption"
                        class="w-full px-4 py-2 text-base font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-200 active:scale-95">
                        Enviar
                    </button>

                    <button type="button" v-if="selectedOption" @click="resetForm"
                        class="w-full px-4 py-2 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 transition duration-200 active:scale-95">
                        Limpar
                    </button>
                </form>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu-custom {
    max-width: 400px;
    width: 100%;
    
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(2px); 
    border-left: 2px solid rgba(0, 0, 0, 0.5);

    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 1000;

    transition: 0.3s ease;

    right: -100vw;

    &.show {
        right: 0;
    }
}

.close-menu {

    display: none;
    height: 50px;
    width: 50px;

    backdrop-filter: blur(2px); 
    border-top: unset;

    top: 0;
    left: -50px;

    border-radius: 0 0 0 10px;
    display: flex;

    @media(max-width: $mobile) {
        display: flex;

        height: 40px;
        width: 40px;

        border-radius: 8px;

        left: unset;
        top: 20px;
        right: 24px;
    }
}
</style>