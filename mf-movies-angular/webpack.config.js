const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  name: 'moviesMfe',
  filename: 'remoteEntry.js',
  exposes: {
    './routes': './src/app/movies.routes.ts',
    './MoviesPage': './src/app/presentation/pages/movies/movies.page.ts',
  },
  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },
});
