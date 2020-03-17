const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const externals = require("./node-externals");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  name: "server",
  //in server use string for entry
  entry: "./src/server/render.js",
  output: {
    filename: "prod-server-bundle.js",
    chunkFilenam: "[name].js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },
  //default is web
  target: "node",
  mode: "production",
  externals,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{ loader: "babel-loader" }]
      },
      // {
      //   test: /\.s?css$/,
      //   use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
      // },
      {
        test: /\.css$/,
        use: [
          { loader: ExtractCssChunks.loader },
          {
            loader: "css-loader"
          }
        ]
      },
      { test: /\.md$/, use: { loader: "markdown-with-front-matter-loader" } },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: "file-loader",
            //emitFile:false is better for server-side apps
            options: { name: "/images/[name].[ext]", emitFile: false }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") },
      WEBPACK: true
    }),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    })
  ]
};
