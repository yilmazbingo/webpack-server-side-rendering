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

//order is important
server.use(webpackDevMiddleware);
server.use(webpackHotMiddleware);
server.use(staticMiddleware);

server.listen(3000, () => console.log("lsitening"));
