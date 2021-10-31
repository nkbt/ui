module.exports = {
  plugins: [
    require.resolve('eslint-plugin-react'),
    require.resolve('eslint-plugin-react-hooks'),
    require.resolve('eslint-plugin-import')
  ],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended'
  ],
  parser: require.resolve('@babel/eslint-parser'),
  parserOptions: {
    configFile: require.resolve('./babel.config.js')
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
