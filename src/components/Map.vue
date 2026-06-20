<script setup lang="ts">
import L from 'leaflet';
import { onMounted, ref, watch } from "vue";

import { storeToRefs } from 'pinia';
import { useFormStore } from '@/stores/form/form.store';
const { FORM_STATE, CLEAR_FORM_STATE } = storeToRefs(useFormStore());
const { FORM_DISPATCH } = useFormStore()

let map: L.Map | null = null;
const mapContainer: any = ref(null);

const renderMap = () => {
    map = L.map(mapContainer.value, {
        zoomControl: false,
        maxZoom: 19,
    }).setView([-15.811905321950647, -48.04429411863011], 5);

    L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
            attribution: "© OpenStreetMap contributors",
            maxZoom: 19
        }
    ).addTo(map);

    fixConfigPopupAnimatedZomm()
}

const fixConfigPopupAnimatedZomm = () => {
    (L.Popup.prototype as any)._animateZoom = function (this: any, e: any) {
        if (!this._map)
            return

        const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
            anchor = this._getAnchor()
        L.DomUtil.setPosition(this._container, pos.add(anchor))
    }
}

onMounted(() => renderMap())

watch(
    () => FORM_STATE.value?.linkWms,
    (linkWms) => {

        if(!linkWms || linkWms.length === 0)
            return

        const objWms = extractSettingsWMS(linkWms)

        if(!objWms)
            return

        renderWms(objWms)

        FORM_DISPATCH({linkWms: ''})
    }
)

watch(
    () => CLEAR_FORM_STATE.value,
    (_) => clearLayers()
)

const extractSettingsWMS = (url: string) => {
    try {
        // 1. Cria um objeto URL para separar os parâmetros automaticamente
        const urlObj = new URL(url);
        
        // 2. A URL base é tudo antes da interrogação (?)
        const urlBase = `${urlObj.origin}${urlObj.pathname}`;
        
        // 3. Cria um objeto de busca ignorando a diferença entre maiúsculas e minúsculas
        const params = new URLSearchParams(urlObj.search);
        const options: Record<string, any> = {};

        const ignoreParams = ['bbox', 'width', 'height', 'request', 'service', 'srs', 'crs'];

        for (let [key, value] of params.entries()) {

            const keyLower = key.toLowerCase();

            // Ignora os parâmetros de renderização únicos
            if (ignoreParams.includes(keyLower)) {
                continue;
            }

            let finalKey = key
            if (['layers', 'styles', 'version', 'transparent', 'format'].includes(keyLower)) {
                finalKey = keyLower;
            }

            if(['layers', 'cql_filter', 'sld_body'].includes(key))
                value = decodeURIComponent(value)

            options[finalKey] = value
        }

        // const srsOriginal = options.srs || options.SRS;

        return {
            urlBase: urlBase,
            options: {
                ...options,
                // srs: srsOriginal || 'EPSG:3857', 
                srs: 'EPSG:3857', 
                format: 'image/png',
                transparent: true,
                minZoom: 6,
                maxZoom: 20,
                // tileSize: 512,
                // zoomOffset: -1,
                zIndex: 450,
            }
        };

    } catch (erro) {
        console.error("Link WMS inválido fornecido pelo usuário:", erro);
        return null;
    }
}

const wmsLayer = ref<L.TileLayer.WMS | null>(null)

const clearLayers = () => {
    if (map && wmsLayer.value) {
        map.removeLayer(wmsLayer.value as any)
    }
}

const renderWms = (objWms: { urlBase: string, options: any }) => {
    if (!map || !objWms) return

    clearLayers()

    wmsLayer.value = L.tileLayer.wms(objWms.urlBase, objWms.options).addTo(map)
}

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