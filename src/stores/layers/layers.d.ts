// stores/layers/layers.d.ts
export default interface QcLayersInterface {
	layerWms: L.TileLayer.WMS | null;
	layerName: string;
	baseUrl: string;
	workspace: string;
}