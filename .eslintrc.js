module.exports = {
  root: true,
  env: {
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vuetify/base',
    'plugin:vuetify/recommended',
    '@vue/standard',
    '@vue/typescript'
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint']
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-case-declarations': 'warn',
    'sort-imports': 'error',
    'space-before-function-paren': 1,
    'no-use-before-define': 'off',
    'max-len': ['warn', { code: 150, ignoreRegExpLiterals: true }],
    'vue/attribute-hyphenation': 'off',
    'vue/no-deprecated-filter': 'warn',
    'vue/no-deprecated-slot-scope-attribute': 'warn',
    'vue/no-deprecated-v-bind-sync': 'off', // FUTURE: Fix deprecated v-bind sync
    'vue/no-deprecated-v-on-native-modifier': 'off', // Enable for Vue3
    'vue/no-v-for-template-key-on-child': 'off', // Enable for Vue 3
    'vue/no-v-html': 'off',
    'vue/v-on-event-hyphenation': 'off',
    'vue/no-ref-as-operand': 'error',
    'vue/require-prop-types': 'off',
    '@typescript-eslint/ban-types': 'warn',
    '@typescript-eslint/no-duplicate-enum-values': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
    'vue/multi-word-component-names': ['error', { ignores: ['Dashboard', 'Unauthorized', 'Search'] }]
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
