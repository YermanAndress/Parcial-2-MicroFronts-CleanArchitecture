const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'mf-reviews',
  filename: "remoteEntry.js",
  exposes: {
    './ReviewsPage': './src/app/presentation/pages/reviews/reviews.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
