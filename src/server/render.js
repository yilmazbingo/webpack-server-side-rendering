// import React from "react";
// import { renderToString } from "react-dom/server";
// import Routes from "../Routes";
// import { StaticRouter } from "react-router-dom";
// import {
//   fluchChunkName,
//   flushChunkNames
// } from "react-universal-component/server";
// import flushChunks from "webpack-flush-chunks";

// export default ({ clientStats }) => (req, res) => {
//   const app = renderToString(
//     <StaticRouter location={req.originalUrl} context={{}}>
//       <Routes />
//     </StaticRouter>
//   );

//   const { js, styles, cssHash } = flushChunks(clientStats, {
//     chunkNames: flushChunkNames()
//   });
//   res.send(`
//   <html lang="en">
//   <head>
//     <meta charset="UTF-8"/>
//     <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//     // <link rel="stylesheet" Content-Type: "text/css" href="/vendor.css"/>
//     ${styles}
//     <title>Document</title>
//   </head>
//   <body>
//   <div id="react-root">${app}</div>
//   ${js}
//   ${cssHash}
//   // <script src='vendor-bundle.js'></script>
//   // <script src='main-bundle.js'></script>
//   </body>
//   </html>
//     `);
// };

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import Routes from "../Routes";

import { clearChunks, flushChunkNames } from "react-universal-component/server";
import flushChunks from "webpack-flush-chunks";

export default ({ clientStats }) => (req, res) => {
  clearChunks();
  const context = {};

  const app = renderToString(
    <StaticRouter location={req.originalUrl} context={context}>
      <Routes />
    </StaticRouter>
  );

  const { js, styles, cssHash } = flushChunks(clientStats, {
    chunkNames: flushChunkNames()
  });

  res.send(`
    <html>
      <head>
        ${styles}
      </head>
      <body>
        <div id="react-root">${app}</div>
        ${cssHash}

        ${js}
      </body>
    </html>
  `);
};
