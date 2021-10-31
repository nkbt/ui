module.exports = function babelConfig(api) {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      require.resolve('@babel/preset-react'),
      [require.resolve('@babel/preset-env'), {targets: {browsers: ['last 1 Chrome version']}}]
    ]
  };
};
