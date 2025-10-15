import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    plugins: [
      react(),
      VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'ConsultaCerta',
        short_name: 'ConsultaCerta',
        description: 'Sistema de consultas médicas',
        theme_color: '#3b82f6',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: 'assets/cruz.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'assets/cruz.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 ano
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    host: '0.0.0.0', // Permite acesso de qualquer IP na rede
    port: 5173, // Porta padrão do Vite
    strictPort: false, // Permite usar uma porta diferente se 5173 estiver ocupada
    open: false, // Não abre automaticamente o navegador
    cors: true, // Habilita CORS para todas as origens
    hmr: {
      port: 5174, // Porta diferente para HMR para evitar conflitos
    },
  },
});
