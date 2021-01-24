import logo from "./logo.svg";
import React from "react";
import "./OnlyNav.css";
import { throws } from "assert";
interface NavProps {
  maxPages:number;
}
class Navigation extends React.Component<NavProps,
  {
    pageNumber: number;
    indicator: boolean[];
  } > 
  {
  constructor(props: NavProps) {
    super(props);
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
    // const indexes = this.state.indicator;
    // for (let i = 1; i < indexes.length; i++) {
    //   if (indexes[i] == true) {
    //     indexes[i] = false;
    //     indexes[i - 1] = true;
    //     break;
    //   }
    // }
    this.setState({
      pageNumber: this.state.pageNumber - 1 < 0 ? 0 : this.state.pageNumber
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
    return (
      <div className="dot-navi">
        <span onClick={this.leftChange}> &lt; </span>{" "}
        {/* <button className={style[0] + " dot"} onClick={() => this.handleChange(0)}>
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
        </button> */}
        <input type="number" readOnly={true} value={this.state.pageNumber + 1} name="page" min={1} max={this.props.maxPages} id="page"/>
        <span onClick={this.rightChange}> &gt; </span>{" "}
      </div>
    );
  }
}

export default Navigation;
