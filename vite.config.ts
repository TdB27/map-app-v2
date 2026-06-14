import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite' // 1. Importe o Tailwind

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		tailwindcss() // 2. Adicione o plugin aqui
	],
	server: {
		watch: {
		usePolling: true,
		},
	},
})
