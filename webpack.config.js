const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const mf=require("@angular-architects/module-federation/webpack");

const share = mf.share;

module.exports = {
  output: {
    publicPath: "http://localhost:4302/",
    uniqueName: "fc",
    scriptType: 'text/javascript'
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
      library: { type: "var", name: "fc" },
      filename: "remoteEntry.js",
      exposes: {
        "./web-components": "./src/bootstrap.ts"
      },
      shared: share({
        "@angular/core": {requiredVersion: "auto"},
        "@angular/router": {requiredVersion: "auto"},
        "@angular/common": {requiredVersion: "auto"}
      })
    }),
  ],
};