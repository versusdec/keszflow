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
    // eslint error 'React' must be in scope when using JSX fix
    'react/react-in-jsx-scope': 0,
    // eslint error `'` can be escaped with `&apos;` fix
    'react/no-unescaped-entities': 0,
  },
}
