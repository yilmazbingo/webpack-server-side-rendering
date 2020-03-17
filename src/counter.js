import { hot } from "react-hot-loader/root";

import React from "react";

// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       count: 0
//     };
//   }

//   climb() {
//     this.setState(() => ({ count: this.state.count + 1 }));
//   }
//   render() {
//     return (
//       <div onClick={this.climb.bind(this)}>
//         <h1>Cou:{this.state.count}</h1>
//       </div>
//     );
//   }
// }

// export default hot(Counter);

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  climb() {
    this.setState(() => ({ count: this.state.count + 1 }));
  }
  render() {
    return (
      <div className="profile">
        <img src={require("./images/pict.jpg")} alt="" />
        <h1>indejklk</h1>
        <div className="content"></div>
      </div>
    );
  }
}

export default hot(Counter);
