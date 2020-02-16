require("@babel/runtime/regenerator");
require("@babel/register"); //this is for import statements
//this set up the websocket connection
require("webpack-hot-middleware/client?reload=true");
require("./styles/main.scss");
require("./index.html");
require("./app");
// require("react-hot-loader/patch");
