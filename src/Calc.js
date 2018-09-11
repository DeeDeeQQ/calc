import React, { Component } from "react";
import * as math from "mathjs";

export default class Calc extends Component {
  state = {
    data: 0,
    result: null,
    symbols: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "*",
      "%",
      "+",
      "-",
      "_",
      "="
    ]
  };

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress, false);
  }

  calculateOperations = () => {
    let result = this.state.data.join("");
    if (result) {
      result = math.eval(result);
      result = math.format(result, { precision: 14 });
      result = String(result);
      this.setState({
        result: [result],
        data: [result]
      });
    }
  };

  handleKeyPress = e => {
    if (e.key === "Enter") {
      this.calculateOperations();
    } else if (this.state.symbols.indexOf(e.key) !== -1) {
      if (this.state.data === 0 || this.state.data === this.state.result) {
        this.state.data = [e.key];
      } else if (e.key === "_") {
        this.state.data.push(this.state.result);
      } else {
        this.state.data.push(e.key);
      }
      this.setState({
        data: this.state.data
      });
    } else {
      this.setState({
        data: 0
      });
    }
  };

  handleClick = e => {
    if (e.target.value === "=") {
      this.calculateOperations();
    } else {
      if (this.state.data === 0 || this.state.data === this.state.result) {
        this.state.data = [e.target.value];
      } else if (e.target.value === "_") {
        this.state.data.push(this.state.result);
      } else {
        this.state.data.push(e.target.value);
      }
      this.setState({
        data: this.state.data
      });
    }
  };

  render() {
    return (
      <div>
        <p>{this.state.data}</p>
        {this.state.symbols.map(digit => (
          <button key={digit} onClick={this.handleClick} value={digit}>
            {digit}
          </button>
        ))}
      </div>
    );
  }
}
