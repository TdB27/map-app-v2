<script setup lang="ts">
import Map from './components/Map.vue'
import Menu from './components/Menu.vue'
import ListCardLayers from './components/ListCardLayers.vue'

</script>

<template>
	<div class="relative">
		<Map />
		<Menu class="absolute" />
		<ListCardLayers class="absolute" />
	</div>
</template>
