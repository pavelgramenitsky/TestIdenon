/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    app: path.resolve(__dirname, "../src/app.ts"),
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "../dist"),
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: ["html-loader"],
      },
      {
        test: /\.ts?$/,
        use: ["ts-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: "public/assets", to: "assets" }],
    }),
    new webpack.ProvidePlugin({
      PIXI: "pixi.js",
    }),
  ],
  optimization: {
    namedChunks: true,
    splitChunks: {
      name: "vendor",
      filename: "common.js",
      chunks: "all",
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 4,
        },
      },
    },
  },
};
