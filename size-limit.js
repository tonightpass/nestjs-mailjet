const modifyWebpackConfig = (config) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
    externals: {
      "react-native": true,
    },
  };
};

module.exports = [
  {
    path: "packages/nestjs-mailjet/dist/tonightpass-nestjs-mailjet.cjs.prod.js",
    modifyWebpackConfig,
  },
  {
    path: "packages/nestjs-mailjet/dist/tonightpass-nestjs-mailjet.esm.js",
    modifyWebpackConfig,
  },
  {
    path: "packages/nestjs-sinch/dist/tonightpass-nestjs-sinch.cjs.prod.js",
    modifyWebpackConfig,
  },
  {
    path: "packages/nestjs-sinch/dist/tonightpass-nestjs-sinch.esm.js",
    modifyWebpackConfig,
  },
];