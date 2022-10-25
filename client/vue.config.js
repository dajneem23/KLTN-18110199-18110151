import { join } from 'path';

function resolveSrc(_path) {
  return join(__dirname, _path);
}
// vue.config.js
export const lintOnSave = true;
export const configureWebpack = {
  // Set up all the aliases we use in our app.
  resolve: {
    alias: {
      assets: resolveSrc('src/assets'),
      '@': resolveSrc('src'),
    },
  },
};
export const css = {
  // Enable CSS source maps.
  sourceMap: process.env.NODE_ENV !== 'production',
};
export const assetsDir = 'static';
