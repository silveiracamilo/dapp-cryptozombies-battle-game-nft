import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths';
import viteCompression from "vite-plugin-compression";
import { obfuscator } from "rollup-obfuscator";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    tsconfigPaths(),
    viteCompression(),
    ...(mode === "production"
      ? [
        obfuscator({
          // your javascript-obfuscator options
          // [See more options](https://github.com/javascript-obfuscator/javascript-obfuscator)
          debugProtection: true,
          stringArrayRotate: true, // Rotaciona valores do array de strings
          stringArray: true, // Insere strings em um array
          stringArrayThreshold: 0.75, // Percentual de strings a serem ofuscadas
          splitStrings: true, // Divide strings grandes em partes menores
          splitStringsChunkLength: 5, // Define o tamanho dos chunks para strings divididas
        }),
      ]
    : []),
  ],
  build: {
    outDir: path.join(__dirname, "build"),
    rollupOptions: {
      output: {
        entryFileNames: "[name].[hash].js",
        chunkFileNames: "[name].[hash].js",
        manualChunks: (id) => {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
}))
