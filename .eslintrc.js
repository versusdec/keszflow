module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'standard',
    'plugin:storybook/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    next: {
      rootDir: 'packages/panel/',
    },
  },
  rules: {
    'react/react-in-jsx-scope': 0,
    'react/no-unescaped-entities': 0,
    'react/jsx-filename-extension': [1, { extensions: ['.ts', '.tsx'] }],
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
  },
}
