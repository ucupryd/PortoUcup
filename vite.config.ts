import { defineConfig, loadEnv } from 'vite'
import { Buffer } from 'node:buffer'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const user = env.GO2RTC_USER
  const pass = env.GO2RTC_PASS
  const auth = user && pass ? `Basic ${Buffer.from(`${user}:${pass}`).toString('base64')}` : undefined

  return {
    plugins: [
      figmaAssetResolver(),
      // The React and Tailwind plugins are both required for Make, even if
      // Tailwind is not being actively used – do not remove them
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        // Alias @ to the src directory
        '@': path.resolve(__dirname, './src'),
      },
    },

    // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
    assetsInclude: ['**/*.svg', '**/*.csv'],
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('recharts')) {
                return 'vendor-charts';
              }
              if (id.includes('mqtt')) {
                return 'vendor-mqtt';
              }
              if (id.includes('@supabase')) {
                return 'vendor-supabase';
              }
              if (
                id.includes('react') ||
                id.includes('react-dom') ||
                id.includes('react-router') ||
                id.includes('motion') ||
                id.includes('lucide-react')
              ) {
                return 'vendor-core';
              }
            }
          },
        },
      },
    },
    server: {
      proxy: {
        '/go2rtc': {
          target: 'https://go2rtc.reinutechiot.com',
          changeOrigin: true,
          ws: true,
          secure: true,
          headers: auth ? { Authorization: auth } : undefined,
          rewrite: (path) => path.replace(/^\/go2rtc/, ''),
        },
      },
    },
  }
})
