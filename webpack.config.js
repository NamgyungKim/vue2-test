const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const merge = require("webpack-merge");
require("@babel/polyfill");

module.exports = (env, opts) => {
  const config = {
    entry: {
      app: ["@babel/polyfill", path.join(__dirname, "main.js")],
    },
    output: {
      filename: "[name].js", // app.js
      path: path.join(__dirname, "build"),
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: "vue-loader",
        },
        {
          test: /\.js$/,
          exclude: /node-modules/,
          loader: "babel-loader",
        },
        {
          test: /\.css$/,
          use: ["vue-style-loader", "css-loader"],
        },
        {
          test: /\.scss$/,
          use: ["vue-style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    plugins: [
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "index.html"),
      }),
      new CopyPlugin({ patterns: [{ from: "assets/", to: "assets" }] }),
    ],
  };

  if (opts.mode === "development") {
    return merge(config, {
      devtool: "eval",
      devServer: {
        open: true,
        hot: true,
      },
    });
  }

  if (opts.mode === "production") {
    return merge(config, {
      devtool: "cheap-module-source-map",
      plugins: [new CleanWebpackPlugin()],
    });
  }
};
