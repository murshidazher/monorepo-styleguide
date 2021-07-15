module.exports = (api) => {
  api.cache(true);

  return {
    presets: [
      '@babel/env',
      '@babel/react',
    ],
    overrides: [
      {
        test: '.packages/monorepo-config/src/**/*.js',
        presets: ['@babel/env'],
        plugins: [
          '@babel/plugin-proposal-object-rest-spread',
        ],
      },
    ],
  };
};
