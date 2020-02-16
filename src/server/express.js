import express from "express";
import path from "path";

const server = express();
const staticMiddleware = express.static("dist");

const webpack = require("webpack");
const config = require("../../config/webpack.dev.js");
const compiler = webpack(config);

const webpackDevMiddleware = require("webpack-dev-middleware")(
  compiler,
  config.devServer
);
//this is automatic reloading
const webpackHotMiddleware = require("webpack-hot-middleware")(compiler);

const isProd = process.env.NODE_ENV === "production";
//order is important
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

const PORT = process.env.PORT || 8080;
server.listen(PORT, () =>
  console.log(`server is listening on http://localhost:${PORT}`)
);
