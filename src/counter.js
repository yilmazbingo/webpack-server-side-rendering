import React from "react";
import { hot } from "react-hot-loader/root";

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  climb() {
    this.setState(() => ({ count: this.state.count + 1 }));
  }
  render() {
    return (
      <div onClick={this.climb.bind(this)}>
        <h1>Cou:{this.state.count}</h1>
      </div>
    );
  }
}

export default hot(Counter);
