<script setup lang="ts">
import L from 'leaflet';
import { onMounted, ref, watch, shallowRef } from "vue";

import { storeToRefs } from 'pinia';
import { useFormStore } from '@/stores/form/form.store';
const { FORM_STATE, CLEAR_FORM_STATE } = storeToRefs(useFormStore());
const { FORM_DISPATCH } = useFormStore()

let map: L.Map | null = null;
const mapContainer: any = ref(null);

const renderMap = () => {
    map = L.map(mapContainer.value, { zoomControl: false, maxZoom: 19 }).setView([-15.811905321950647, -48.04429411863011], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 19
    }).addTo(map);

    fixConfigPopupAnimatedZomm()
}

const fixConfigPopupAnimatedZomm = () => {
    (L.Popup.prototype as any)._animateZoom = function (this: any, e: any) {
        if (!this._map || !this._map.options || !this._map.options.crs)
            return

        try {
            const pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
                anchor = this._getAnchor()
            L.DomUtil.setPosition(this._container, pos.add(anchor))
        } catch (error: any) {
            console.debug("Popup zoom animation ignored for detached layer.");
        }
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
            if (['layers', 'styles', 'version', 'transparent', 'format', 'cql_filter', 'sld_body'].includes(keyLower)) {
                finalKey = keyLower;
            }

            if(['layers', 'cql_filter', 'sld_body'].includes(key))
                value = decodeURIComponent(value)

            options[finalKey] = value
        }

        return {
            urlBase: urlBase,
            options: {
                ...options,
                crs: L.CRS.EPSG3857,
                format: 'image/png',
                transparent: true,
                minZoom: 6,
                maxZoom: 19,
                zIndex: 450,
            }
        };

    } catch (erro) {
        console.error("Link WMS inválido fornecido pelo usuário:", erro);
        return null;
    }
}

const wmsLayer = shallowRef<L.TileLayer.WMS | null>(null)
let pendingWmsTimeout: ReturnType<typeof setTimeout> | null = null
let wmsRenderToken: number = 0

const clearLayers = () => {

    wmsRenderToken++

    if (pendingWmsTimeout) {
        clearTimeout(pendingWmsTimeout)
        pendingWmsTimeout = null
    }

     if (!map || !wmsLayer.value) {
        wmsLayer.value = null
        return
    }

    const layer: L.TileLayer.WMS | null = wmsLayer.value

    if (map.hasLayer(layer)) {
        map.removeLayer(layer)
    }

    wmsLayer.value = null
}

const renderWms = (objWms: { urlBase: string, options: any }) => {
     if (!map || !objWms) return

    clearLayers()

    const currentToken: number = ++wmsRenderToken

    /* 
        CAMADA TESTE
        https://atlas-geo.goinfra.go.gov.br/geoserver/sgp/wms?service=WMS&version=1.1.0&request=GetMap&layers=sgp%3Arodovia_segmentos&bbox=-53.202919006347656%2C-19.421871185302734%2C-46.01564025878906%2C-12.875435829162598&width=768&height=699&srs=EPSG%3A4674&styles=&format=application/openlayers
    */

    const layer: L.TileLayer.WMS = L.tileLayer.wms(objWms.urlBase, {
        ...objWms.options,
        pane: 'tilePane',
        updateWhenZooming: false,
        updateWhenIdle: true,
        keepBuffer: 0,
    })

    if (currentToken !== wmsRenderToken || !map) {
        return
    }

    wmsLayer.value = layer
    layer.addTo(map)
    

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