const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  output: {
    publicPath: "auto",
  },
  optimization: {
    runtimeChunk: false,
  },
  experiments: {
    outputModule: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "fc",
      exposes: {
        "./app-module": "./src/app/my-feature/my-feature.module.ts"
      },
      library: { type: "module" },
      filename: "remoteEntry.js",
      shared: [
        "@angular/core",
        "@angular/router",
        "@angular/common",
      ]
    }),
  ],
};