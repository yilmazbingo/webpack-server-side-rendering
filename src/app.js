import React from "react";
import ReactDOM from "react-dom";
import AppRoot from "./components/AppRoot";

// function render(Component) {
//   ReactDOM.render(
//     <AppContainer>
//       <Component />
//     </AppContainer>,
//     document.getElementById("root")
//   );
// }

// render(Counter);

// //when app is loader, it will look at the module
// if (module.hot) {
//   module.hot.accept("./counter.js", () => {
//     const NewCounter = require("./counter").default;
//     render(NewCounter);
//   });
// }
function render(Component) {
  ReactDOM.hydrate(<Component />, document.getElementById("react-root"));
}
render(AppRoot);

// ReactDOM.hydrate(<AppRoot />, document.getElementById("react-root"));
