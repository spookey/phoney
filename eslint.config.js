import eslintPluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import { defineConfig } from "eslint/config";
import js from '@eslint/js'
import globals from 'globals';

export default defineConfig([
  {
    ignores: [
      '**/dist/*',
    ],
  },
  ...eslintPluginVue.configs['flat/essential', 'flat/recommended'],
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);
