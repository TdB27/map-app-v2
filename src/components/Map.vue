<script setup lang="ts">
import L from 'leaflet';
import { onMounted, ref, watch } from "vue";

import { storeToRefs } from 'pinia';
import { useFormStore } from '../stores/form/form.store';
const { FORM_STATE } = storeToRefs(useFormStore());

let map = null;
const mapContainer = ref(null);

const renderMap = () => {
    map = L.map(mapContainer.value, {
        zoomControl: false,
        maxZoom: 19,
    }).setView([-15.811905321950647, -48.04429411863011], 5);

    const streets = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(map);

    fixConfigPopupAnimatedZomm()
}

const fixConfigPopupAnimatedZomm = () => {
    L.Popup.prototype._animateZoom = function (e) {
        if (!this._map)
            return

        const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
            anchor = this._getAnchor()
        L.DomUtil.setPosition(this._container, pos.add(anchor))
    }
}

onMounted(() => {
    renderMap()
})

watch(
    () => FORM_STATE.value?.linkWms,
    (linkWms) => {
        if(!linkWms && linkWms.length === 0)
            return

        console.log(linkWms)
    }
)

</script>

<template>
    <div class="map" ref="mapContainer"></div>
</template>

<style lang="scss" scoped>
.map {
    height: 100vh;
    width: 100%;
}
</style>