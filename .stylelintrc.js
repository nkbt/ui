module.exports = {
  extends: [require.resolve('stylelint-config-prettier')],
  plugins: [require.resolve('stylelint-prettier')],
  rules: {
    'prettier/prettier': true
  }
};
