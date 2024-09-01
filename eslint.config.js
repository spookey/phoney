import eslintPluginVue from 'eslint-plugin-vue';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js'

export default [
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
    },
  },
];
