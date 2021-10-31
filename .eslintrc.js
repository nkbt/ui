module.exports = {
  plugins: ['eslint-plugin-react', 'eslint-plugin-react-hooks', 'eslint-plugin-import'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    configFile: './babel.config.js'
  },
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: '17'
    }
  },

  rules: {
    'max-len': ['error', {code: 120, ignoreUrls: true, ignoreTrailingComments: true}]
  }
};
