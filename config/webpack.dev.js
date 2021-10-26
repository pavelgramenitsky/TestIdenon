/* eslint-disable @typescript-eslint/no-var-requires */
const Webpack = require("webpack");
const WebpackMerge = require("webpack-merge");
const common = require("./webpack.common");

module.exports = WebpackMerge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: true,
    https: false,
    hot: true,
    host: "0.0.0.0",
    port: 8080,
    useLocalIp: true,
    compress: true,
    headers: {},
    proxy: {},
    before(app) {},
    after(app) {},
  },
  plugins: [new Webpack.HotModuleReplacementPlugin()],
});
