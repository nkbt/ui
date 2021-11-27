const path = require('path');

module.exports = {
  plugins: ['react', 'react-hooks', 'import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {configFile: path.resolve(__dirname, './babel.config.js')},
  env: {browser: true, es6: true, node: true},
  settings: {
    react: {version: '17'},
    'import/resolver': {
      node: {
        extensions: ['.js']
      }
    }
  },
  rules: {
    'react/no-unescaped-entities': 'off',

    'max-len': ['error', {code: 120, ignoreUrls: true, ignoreTrailingComments: true}],
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}]
  }
};
