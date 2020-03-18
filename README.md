# webpack-server-side-rendering

### Compressing Assets in Production
   
this package uses gzip algorithm by default. Gzip is standard and understood by all the browsers. IN the webpack.prod-client.js

            `const CompressionPlugin = require("compression-webpack-plugin");

             plugins: [
                  new CompressionPlugin(),
                ]`

- This will compress your assets files except "jpeg" images. Because jpeg is already a compressed file type. 
- We created gzip files but we cannot load them yet. Because in network tab, content type of the files should be gzip. We need a better server configuration. 
- Heroku still does not support gzip at the server level. 
- Heroku does not modify HTTP requests or responses that are sent by your application. This means that features like HTTP compression are your application’s responsibility.. So we will do it at the express level.

         npm i express-static-gzip
         
         const expressStaticGzip = require("express-static-gzip");
          server.use(expressStaticGzip("dist")); //make sure you use this middleware first
- We download files as gzip but the browser uses the uncompressed version.
- Brotli is another compression algorithm originally developed by Google, and offers compression superior to gzip.
        const BrotliPlugin = require("brotli-webpack-plugin");
        new BrotliPlugin(),
        server.use(expressStaticGzip("dist", { enableBrotli: true }));
 
- Now we have a new set of files: original files, gz version, br versions which are even smaller. 
- Webpack compression will compress your files one-time - during your build run. Those compressed versions are then saved to disk. `express-static-gzip` can then serve those pre-compiled versions, so you're not taking the performance hit of gzipping at the point of request. This is useful if Node.js is directly responding to your HTTP requests and you're not using an upstream proxy/load balancer.

#### Minification
- Minification does things like removing whitespace, removing comments, removing non-required semicolons, reducing hex code lengths...
- The file remains perfectly valid code. You wouldn't want to try to read it or work with it, but it's not breaking any rules. The browser can read it and use it just like it could the original file.
- Minification simply alters the text while file compression completely rewrites the binary code within a file.
        const TerserPlugin = require("terser-webpack-plugin");
        optimization:{
        minimizer:[new TerserPluign()]}

       
       
