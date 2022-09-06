import {createVuePlugin} from "vite-plugin-vue2";
import {defineConfig} from 'vite'
import Components from 'unplugin-vue-components/vite'
import {VuetifyResolver} from "unplugin-vue-components/resolvers";
//@ts-ignore
import {fileURLToPath, URL} from "url";

export default defineConfig({
    plugins: [
        createVuePlugin(),
        Components({
            transformer: 'vue2',
            dts: true,
            resolvers: [
                VuetifyResolver()
            ]
        })
    ],
    resolve: {
        alias: {
            //@ts-ignore
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    build: {
        lib: {
            entry: 'src/index.ts',
            name: 'digiwf-form-renderer',
        },
        rollupOptions: {
            external: [
                'vue',
                'vuex',
                'vue-router',
                /@vuetify\/.*/,
                /@koumoul\/.*/
            ],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        },
        minify: 'esbuild'
    }
})