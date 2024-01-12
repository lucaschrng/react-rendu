/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', '@stylistic'],
  rules: {
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
    '@stylistic/object-curly-spacing': ['error', 'always'],
    '@stylistic/indent': ['error', 2],
  },
  root: true,
  ignorePatterns: 'tailwind.config.js',
};