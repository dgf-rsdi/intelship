const withTM = require('next-transpile-modules')(['react-speedometer', 'react-leaflet']);

module.exports = withTM({
  reactStrictMode: true,
  distDir: 'build',
  env: {
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  },
});
