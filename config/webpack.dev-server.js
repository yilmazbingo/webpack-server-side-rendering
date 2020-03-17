// const path = require("path");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const externals = require("./node-externals");
// const webpack = require("webpack");
// const ExtractCssChunks = require("extract-css-chunks-webpack-plugin");

// module.exports = {
//   name: "server",
//   // entry should be string here,
//   entry: "./src/server/render.js",
//   output: {
//     filename: "dev-server-bundle.js",
//     chunkFilename: "[name].js",
//     path: path.resolve(__dirname, "../build"),
//     libraryTarget: "commonjs2"
//   },
//   //default is web
//   target: "node",
//   mode: "development",
//   externals,
//   module: {
//     rules: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         use: [{ loader: "babel-loader" }]
//       },
//       // {
//       //   test: /\.s?css$/,
//       //   // use: ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
//       //   use: ["css-loader", "sass-loader"]
//       // },
//       // {
//       //   test: /\.css$/,
//       //   use: [
//       //     { loader: ExtractCssChunks.loader },
//       //     {
//       //       loader: "css-loader"
//       //     }
//       //   ]
//       // },
//       {
//         test: /\.css$/,
//         use: {
//           loader: "css-loader"
//           // options: {
//           //   minimize: true
//           // }
//         }
//       },
//       { test: /\.md$/, use: { loader: "markdown-with-front-matter-loader" } },
//       {
//         test: /\.(jpg|gif|png)$/,
//         use: [
//           {
//             loader: "file-loader",
//             //emitFile:false is better for server-side apps
//             options: { name: "/images/[name].[ext]", emitFile: false }
//           }
//         ]
//       }
//     ]
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       "process.env": { NODE_ENV: JSON.stringify("development") }
//     }),
//     new webpack.optimize.LimitChunkCountPlugin({
//       maxChunks: 1
//     })
//     // new MiniCssExtractPlugin()
//   ]
// };

const path = require("path");
const webpack = require("webpack");
const externals = require("./node-externals");
// const nodeWebExternals = require("webpack-node-externals");

module.exports = {
  name: "server",
  target: "node",
  externals,
  entry: "./src/server/render.js",
  mode: "development",
  output: {
    filename: "dev-server-bundle.js",
    chunkFilename: "[id].js",
    path: path.resolve(__dirname, "../build"),
    libraryTarget: "commonjs2"
  },
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
        use: {
          loader: "css-loader"
          // options: {
          //   minimize: true
          // }
        }
      },
      {
        test: /\.jpg$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "/images/[name].[ext]",
              emitFile: false
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
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development")
      }
    })
  ]
};
