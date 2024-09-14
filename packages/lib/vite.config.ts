import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        vue(),
        dts({ tsconfigPath: './tsconfig.app.json' })
    ],
    build: {
        outDir: "dist",
        lib: {
            entry: "./src/main.ts",
            name: "VueSmoothDnDNext",
            fileName: (format) => `vue-smooth-dnd-next.${format}.js`,
            formats: ['es', 'cjs', 'umd'],
        },
        rollupOptions: {
            external: ["vue", "smooth-dnd-next"],
            output: {
                globals: {
                  vue: 'Vue',
                  'smooth-dnd-next': 'SmoothDndNext'
                }
            } 
        },
    },
});
