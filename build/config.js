const webpackMerge = require("webpack-merge");
const isProduction = process.env.NODE_ENV === "production";
const vjs = require("./config.vjs.js");
const cjs = require("./config.cjs.js");


const config = {
  entry: "./index.js",
  mode: isProduction ? "production" : "development",
  devtool: isProduction ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = [
  webpackMerge(config, vjs),
  webpackMerge(config, cjs)
];
