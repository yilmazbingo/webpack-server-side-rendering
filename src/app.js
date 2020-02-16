import React from "react";
import ReactDOM from "react-dom";
import Counter from "./counter";
import { AppContainer } from "react-hot-loader";

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

ReactDOM.render(<Counter />, document.getElementById("root"));
