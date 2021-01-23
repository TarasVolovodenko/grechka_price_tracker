import logo from "./logo.svg";
import React from "react";
import "./OnlyNav.css";

class Navigation extends React.Component<
  {},
  {
    pageNumber: number;
    indicator: boolean[];
  }
> {
  constructor() {
    super({});
    this.state = {
      pageNumber: 0,
      indicator: [true, false, false, false, false],
    };
  }

  handleChange = (index: number) => {
    const i = [false, false, false, false, false];
    i[index] = true;
    this.setState({
      pageNumber: index,
      indicator: i,
    });
    console.log(this.state.pageNumber);
  };

  rightChange = () => {
    const indexes = this.state.indicator;
    for (let i = 0; i < indexes.length - 1; i++) {
      if (indexes[i] == true) {
        indexes[i] = false;
        indexes[i + 1] = true;
        break;
      }
    }
    this.setState({
      indicator: indexes,
    });
  };

  leftChange = () => {
    const indexes = this.state.indicator;
    for (let i = 1; i < indexes.length; i++) {
      if (indexes[i] == true) {
        indexes[i] = false;
        indexes[i - 1] = true;
        break;
      }
    }
    this.setState({
      indicator: indexes,
    });
  };

  render() {
    const style = ["a", "a", "a", "a", "a"];
    for (let i = 0; i < style.length; i++) {
      if (this.state.indicator[i] == true) {
        style[i] = "aActive";
        break;
      }
    }
    console.log(style);
    return (
      <div className="dot-navi">
        <span onClick={this.leftChange}> &lt; </span>{" "}
        <button className={style[0] + " dot"} onClick={() => this.handleChange(0)}>
          {" "}
        </button>
        <button className={style[1] + " dot"} onClick={() => this.handleChange(1)}>
          {" "}
        </button>
        <button className={style[2] + " dot"} onClick={() => this.handleChange(2)}>
          {" "}
        </button>
        <button className={style[3] + " dot"} onClick={() => this.handleChange(3)}>
          {" "}
        </button>
        <button className={style[4] + " dot"} onClick={() => this.handleChange(4)}>
          {" "}
        </button>
        <span onClick={this.rightChange}> &gt; </span>{" "}
      </div>
    );
  }
}

export default Navigation;
