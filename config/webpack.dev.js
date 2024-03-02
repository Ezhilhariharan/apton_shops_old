const path = require("path")
const webpack = require("webpack")
const { merge } = require("webpack-merge")

const createWebpackBase = require("./webpack.config")

const baseWebpackConfig = (module.exports = createWebpackBase({
  entryDir: "../src/index.js",
  outputDir: "../build",
  htmlPath: "../src/index.html",
}))

const devWebpackConfig = {
  mode: "development",
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    static: path.join(__dirname, "../build"),
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
}

module.exports = merge(baseWebpackConfig, devWebpackConfig)