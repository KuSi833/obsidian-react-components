import typescript from '@rollup/plugin-typescript';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy'
import css from "rollup-plugin-import-css";
import json from '@rollup/plugin-json';
import fs from 'fs';

const isProd = (process.env.BUILD === 'production');

const banner = 
`/*
THIS IS A GENERATED/BUNDLED FILE BY ROLLUP
if you want to view the source visit the plugins github repository
*/
`;

const vault_plugin_dir = fs.existsSync('./.vault_plugin_dir') ? 
                         fs.readFileSync('./.vault_plugin_dir').toString() : 
                         '.';

export default {
  input: 'src/main.tsx',
  output: {
    dir: vault_plugin_dir,
    sourcemap: 'inline',
    sourcemapExcludeSources: isProd,
    format: 'cjs',
    exports: 'default',
    banner,
  },
  external: ['obsidian'],
  plugins: [
    css(),
    json(),
    typescript(),
    nodeResolve({browser: true}),
    commonjs(),
    nodePolyfills(),
    ...(vault_plugin_dir != '.' ? [copy({
      targets: [
        { src: 'manifest.json', dest: vault_plugin_dir }
      ]
    })] : [])
  ]
};