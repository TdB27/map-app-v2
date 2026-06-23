<script setup lang="ts">

import { BIconFunnelFill } from 'bootstrap-icons-vue'

const props = defineProps({
    menuLgActived: Boolean
})

const emit = defineEmits<{
    (e: 'dispatchMenuAction', action: string)
}>()

const dispatch = (action: string) => {
    emit('dispatchMenuAction', action)
}

</script>

<template>
    <div class="flex flex-col gap-2 absolute open-menu" :class="{'show': !menuLgActived}">
        <button type="button" class="flex items-center justify-center text-white bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-1 duration-200 transition cursor-pointer"
            @click="dispatch('menuLgActived')">
            <BIconFunnelFill class="text-2xl" />
        </button>
    </div>
</template>

<style lang="scss" scoped>
.open-menu {
    display: none;
    width: 50px;

    top: 8px;
    // bottom: 0;
    right: 0;
    z-index: 1000;

    &.show {
        display: flex;
    }

    button {
        height: 50px;
        width: inherit;

        border-radius: 10px 0 0 10px;
    }
}
</style>
