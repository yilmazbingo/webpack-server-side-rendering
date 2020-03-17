// import express from "express";

// import webpack from "webpack";
// import webpackHotServerMiddleware from "webpack-hot-server-middleware";

// const expressStaticGzip = require("express-static-gzip");

// import configDevClient from "../../config/webpack.dev-client.js";
// import configDevServer from "../../config/webpack.dev-server.js";
// import configProdClient from "../../config/webpack.prod-client.js";
// import configProdServer from "../../config/webpack.prod-server.js";
// // const compression = require("compression");
// const server = express();

// const isProd = process.env.NODE_ENV === "production";
// const isDev = !isProd;
// if (isDev) {
//   const compiler = webpack([configDevClient, configDevServer]);
//   const clientCompiler = compiler.compilers[0];
//   const serverCompiler = compiler.compilers[1];

//   //it takes both compilers
//   const webpackDevMiddleware = require("webpack-dev-middleware")(
//     compiler,
//     configDevClient.devServer
//   );
//   //this is automatic reloading
//   //it needs client compiler
//   const webpackHotMiddleware = require("webpack-hot-middleware")(
//     clientCompiler,
//     configDevClient.devServer
//   );
//   server.use(webpackDevMiddleware);
//   server.use(webpackHotMiddleware);
//   server.use(webpackHotServerMiddleware(compiler));
// } else {
//   //we have to create build folder here

//   webpack([configProdClient, configProdServer]).run((err, stats) => {
//     const clientStats = stats.toJson().children[0];
//     const render = require("../../build/prod-server-bundle.js").default;
//     server.use(expressStaticGzip("dist", { enableBrotli: true }));

//     server.use(render({ clientStats }));
//     done();
//     // if (err || stats.hasErrors()) {
//     //   console.log("somehing is wrong with webpack", err);
//     //   return;
//     // }
//     // console.log(
//     //   stats.toString({
//     //     chunks: false, // Makes the build much quieter
//     //     colors: true // Shows colors in the console
//     //   })
//     // );
//   });
// }

// // server.use(compression());

// // const staticMiddleware = express.static("dist");

// // server.use(staticMiddleware);
// const PORT = process.env.PORT || 8000;
// server.listen(PORT, () =>
//   console.log(
//     `server is listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
//   )
// );

import express from "express";
const server = express();
import path from "path";
// const expressStaticGzip = require("express-static-gzip");
import expressStaticGzip from "express-static-gzip";
import webpack from "webpack";
import webpackHotServerMiddleware from "webpack-hot-server-middleware";

import configDevClient from "../../config/webpack.dev-client";
import configDevServer from "../../config/webpack.dev-server.js";
import configProdClient from "../../config/webpack.prod-client.js";
import configProdServer from "../../config/webpack.prod-server.js";

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;
const PORT = process.env.PORT || 8000;
let isBuilt = false;

const done = () => {
  !isBuilt &&
    server.listen(PORT, () => {
      isBuilt = true;
      console.log(
        `Server listening on http://localhost:${PORT} in ${process.env.NODE_ENV}`
      );
    });
};

if (isDev) {
  const compiler = webpack([configDevClient, configDevServer]);

  const clientCompiler = compiler.compilers[0];
  const serverCompiler = compiler.compilers[1];

  const webpackDevMiddleware = require("webpack-dev-middleware")(
    compiler,
    configDevClient.devServer
  );

  const webpackHotMiddlware = require("webpack-hot-middleware")(
    clientCompiler,
    configDevClient.devServer
  );

  server.use(webpackDevMiddleware);
  server.use(webpackHotMiddlware);
  server.use(webpackHotServerMiddleware(compiler));
  console.log("Middleware enabled");
  done();
} else {
  webpack([configProdClient, configProdServer]).run((err, stats) => {
    const clientStats = stats.toJson().children[0];
    const render = require("../../build/prod-server-bundle.js").default;
    server.use(
      expressStaticGzip("dist", {
        enableBrotli: true
      })
    );
    server.use(render({ clientStats }));
    done();
  });
}
