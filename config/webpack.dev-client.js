// const path = require("path");
// const webpack = require("webpack");
// // const HTMLWebpackPlugin = require("html-webpack-plugin");
// // const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// // const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// // const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
// //   .BundleAnalyzerPlugin;

// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");
// module.exports = {
//   // this is relative path. iw we do not specify default location is:./src/main.js
//   name: "client",

//   entry: {
//     vendor: ["react", "react-dom"],

//     main: [
//       "@babel/polyfill",
//       "@babel/runtime/regenerator",
//       "webpack-hot-middleware/client?reload=true",
//       "react-hot-loader/patch",
//       "./src/main.js"
//     ]
//   },
//   mode: "development",
//   output: {
//     filename: "[name]-bundle.js",

//     //this deletes hot-update bundle
//     chunkFilename: "[name]-[chunkhash].js",
//     path: path.resolve(__dirname, "../dist"),
//     publicPath: "/"
//   },
//   optimization: {
//     runtimeChunk: {
//       name: "bootstrap"
//     },
//     splitChunks: {
//       chunks: "initial",
//       cacheGroups: {
//         vendors: {
//           test: /[\\/]node_modules[\\/]/,
//           name: "vendor"
//         }
//       }
//     }
//   },
//   // optimization: {
//   //   namedModules: true,
//   //   splitChunks: {
//   //     chunks: "all",
//   //     cacheGroups: {
//   //       vendor: {
//   //         name: true,
//   //         chunks: "initial",
//   //         minChunks: 2
//   //       }
//   //     }
//   //   }
//   // },
//   devServer: {
//     contentBase: "dist",
//     overlay: true,
//     hot: true,
//     stats: { colors: true }
//   },

//   devtool: "source-map",
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         use: [{ loader: "babel-loader" }],
//         exclude: /node_modules/
//       },
//       // {
//       //   test: /\.s?css$/,
//       //   use: [
//       //     ExtractCssChunks.loader,
//       //     "css-loader",
//       //     "postcss-loader",
//       //     "sass-loader"
//       //   ]
//       // },
//       {
//         test: /\.css$/,
//         use: [
//           { loader: ExtractCssChunks.loader },
//           {
//             loader: "css-loader"
//           }
//         ]
//       },
//       {
//         test: /\.html$/,
//         use: [
//           {
//             loader: "html-loader",
//             //attributes in element image, src and link attribute we want to target
//             options: { attrs: ["img:src", "link:href"] }
//           }
//         ]
//       },
//       {
//         test: /\.md$/,
//         use: [{ loader: "markdown-with-front-matter-loader" }]
//       },
//       {
//         test: /\.(jpg|gif|png)$/,
//         use: [
//           {
//             loader: "file-loader",
//             //what ever name on that file, just pass that name
//             options: { name: "images/[name].[ext]" }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new webpack.HotModuleReplacementPlugin(),
//     // new HTMLWebpackPlugin({ template: "./src/index.html" }),
//     // new CleanWebpackPlugin(),
//     new ExtractCssChunks({ hot: true }),
//     // new MiniCssExtractPlugin(),
//     new webpack.DefinePlugin({
//       "process.env": { NODE_ENV: JSON.stringify("development"), WEBPACK: true }
//     })
//     // new BundleAnalyzerPlugin({
//     //   generateStatsFile: true,
//     //   analyzerMode: "static"
//     // })
//   ]
// };

const path = require("path");
const webpack = require("webpack");
const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

module.exports = {
  name: "client",
  mode: "development",
  entry: {
    vendor: ["react", "react-dom"],
    main: [
      // "react-hot-loader/patch",
      // "babel-runtime/regenerator",
      // "webpack-hot-middleware/client?reload=true",
      "./src/main.js"
    ]
  },
  output: {
    filename: "[name]-bundle.js",
    chunkFilename: "[id].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/"
  },
  devServer: {
    contentBase: "dist",
    overlay: true,
    hot: true,
    stats: {
      colors: true
    }
  },
  // optimization: {
  //   runtimeChunk: {
  //     name: "bootstrap"
  //   },
  //   splitChunks: {
  //     chunks: "initial",
  //     cacheGroups: {
  //       vendors: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor"
  //       }
  //     }
  //   }
  // },

  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
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
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "images/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: "markdown-with-front-matter-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractCssChunks({ hot: true }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        WEBPACK: true
      }
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
