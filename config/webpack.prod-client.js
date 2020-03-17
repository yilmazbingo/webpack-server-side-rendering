const path = require("path");
const webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  // entry: {
  //   main: ["@babel/polyfill", "react-hot-loader/patch", "./src/main.js"],
  //   other: ["@babel/polyfill", "react-hot-loader/patch", "./src/main.js"]
  // },
  name: "client",
  entry: "./src/main.js",
  mode: "production",
  output: {
    filename: "[name]-output.js",
    path: path.resolve(__dirname, "../build"),
    publicPath: "/"
  },

  optimization: {
    // minimize: true, //default is true in production
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendor: {
          name: true,
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{ loader: "babel-loader" }],
        exclude: /node_modules/
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     ExtractCssChunks.loader,
      //     "css-loader",
      //     "postcss-loader",
      //     "sass-loader"
      //   ]
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
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { attrs: ["img:src", "link:href"] }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [{ loader: "markdown-with-front-matter-loader" }]
      },
      {
        test: /\.(jpg|gif|png)$/,
        use: [
          {
            loader: "file-loader",
            options: { name: "images/[name].[ext]" }
          }
        ]
      }
    ]
  },
  plugins: [
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require("cssnano"),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    }),
    new ExtractCssChunks(),
    new CompressionPlugin(),
    new BrotliPlugin(),
    // new MiniCssExtractPlugin(),
    // new HTMLWebpackPlugin({ template: "./src/index.html" }),
    new webpack.DefinePlugin({
      "process.env": { NODE_ENV: JSON.stringify("production") },
      WEBPACK: true
    })
  ]
};
//env.NODE_ENV is defined as production in package,json build script. we can pass anything
