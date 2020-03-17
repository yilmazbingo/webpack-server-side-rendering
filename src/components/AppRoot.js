import { hot } from "react-hot-loader/root";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routes from "../Routes";

class AppRoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Router>
        <Routes />
      </Router>
    );
  }
}
export default hot(AppRoot);

// class AppRoot extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   climb() {
//     this.setState(() => ({ count: this.state.count + 1 }));
//   }
//   render() {
//     return (
//       <div className="profile">
//         <img src={require("../images/pict.jpg")} alt="" />
//         <h1>{this.props.prop1}</h1>
//         <h2>{Markdown.title}</h2>
//         <div
//           className="content"
//           dangerouslySetInnerHTML={{ __html: Markdown.__content }}
//         ></div>
//       </div>
//     );
//   }
// }

// export default AppRoot;
