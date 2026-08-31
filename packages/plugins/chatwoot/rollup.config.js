const typescript = require('rollup-plugin-typescript2').default || require('rollup-plugin-typescript2')
const { nodeResolve } = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs').default || require('@rollup/plugin-commonjs')
module.exports = {
    input: ['src/index.ts'],
    output: [
        {
            dir: 'dist',
            entryFileNames: '[name].cjs',
            format: 'cjs',
            exports: 'named',
        },
        {
            dir: 'dist',
            entryFileNames: '[name].mjs',
            format: 'esm',
        },
    ],
    plugins: [
        commonjs(),
        nodeResolve({
            resolveOnly: (module) => !/@builderbot\/bot/i.test(module),
        }),
        typescript(),
    ],
}
