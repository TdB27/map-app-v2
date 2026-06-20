import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // 1. Importe o Tailwind
import { fileURLToPath, URL } from 'node:url'

// https://vite.dev/config/
export default defineConfig({
	// base: './',
	base: 'map-app-v2',
	plugins: [
		vue(),
		tailwindcss() // 2. Adicione o plugin aqui
	],
	resolve: {
		alias: {
		// Configura o @ para apontar para a pasta src
			'@': fileURLToPath(new URL('./src', import.meta.url))
		}
	},
	server: {
		watch: {
			usePolling: true,
		},
	},
	optimizeDeps: {
		include: ['leaflet', 'vue-select'],
	},
})
