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
            fileName: "vue-smooth-dnd-next",
            formats: ['es', 'cjs', 'umd'],

        },
        rollupOptions: {
            external: ["vue", "smooth-dnd-next"],
        },
    },
});
