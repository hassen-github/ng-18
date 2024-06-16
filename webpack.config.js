const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
////////////////////////
module.exports = {
  output: {
    publicPath: "https://hassen-github.github.io/ng-18-example/",
    uniqueName: "fc"
  },
  optimization: {
    // Only needed to bypass a temporary bug
    runtimeChunk: false
  },
  plugins: [
    new ModuleFederationPlugin({

      // For remotes (please adjust)
      
      name: "fc",
      library: { type: "var", name: "fc" },
      filename: "remoteEntry.js",
      exposes: {
        './web-components': './src/bootstrap.ts',
      },
      

      shared: share({
        "@angular/core": { requiredVersion:'auto' }, 
        "@angular/common": { requiredVersion:'auto' }, 
        "@angular/router": { requiredVersion:'auto' },
        "rxjs": { requiredVersion:'auto' }
      })
    }

    )
  ]
};
