// import React from "react";
// import { Route, Switch } from "react-router-dom";
// import universal from "react-universal-component";

// // we do not need those because Universal component will import them
// //also add universal-import plugin to babelrc
// // import Gallery from "./pages/Gallery";
// // import About from "./pages/About";
// // import Article from "./pages/Article";

// //import takes relative current directory
// //this is HOC
// const UniversalComponent = universal(props => import(`./${props.page}`));

// export default () => (
//   <div>
//     <div className="nav">
//       <a href="/">Gallery</a>
//       <a href="/about">About</a>
//       <a href="/article">Article</a>
//     </div>
//     <Switch>
//       <Route exact path="/">
//         <UniversalComponent page="Gallery" />
//       </Route>
//       <Route path="/about">
//         <UniversalComponent page="About" />
//       </Route>
//       <Route path="/article">
//         <UniversalComponent page="Article" />
//       </Route>
//     </Switch>
//   </div>
// );

import React from "react";
import { Route, Link } from "react-router-dom";
import universal from "react-universal-component";
import { Switch } from "react-router";
import "./css/nav.css";

const UniversalComponent = universal(props => import(`./${props.page}`));

export default () => (
  <div>
    <div className="nav">
      <Link to="/">Gallery</Link>
      <Link to="/about">About</Link>
      <Link to="/article">Article</Link>
    </div>
    //{" "}
    <Switch>
      //{" "}
      <Route exact path="/">
        // <UniversalComponent page="Gallery" />
        //{" "}
      </Route>
      //{" "}
      <Route path="/about">
        // <UniversalComponent page="About" />
        //{" "}
      </Route>
      //{" "}
      <Route path="/article">
        // <UniversalComponent page="Article" />
        //{" "}
      </Route>
      //{" "}
    </Switch>
  </div>
);
