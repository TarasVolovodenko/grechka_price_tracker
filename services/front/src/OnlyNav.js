import logo from './logo.svg';
import React, { Component } from 'react';
import "./OnlyNav.css"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      pageNumber: 0, 
      indicator: [true, false, false, false, false]
    }
  }

  handleChange = (index) => {
    const i = [false, false, false, false, false];
    i[index] = true
    this.setState({
      pageNumber: index,
      indicator: i
      })
      console.log(this.state.pageNumber);

    }

    rightChange = () =>{
       const indexes = this.state.indicator;
       for(let i = 0; i < indexes.length - 1; i++){
         if(indexes[i] == true){
           indexes[i] = false;
           indexes[i+1] = true;
           break;
         }
       }
       this.setState({
        indicator: indexes
       })
    }

    leftChange = () =>{
      const indexes = this.state.indicator;
      for(let i = 1; i < indexes.length; i++){
        if(indexes[i] == true){
          indexes[i] = false;
          indexes[i-1] = true;
          break;
        }
      }
      this.setState({
        indicator: indexes
       })
   }

  render() {
    const style = ["a", "a", "a", "a", "a"];
    for(let i = 0; i < style.length; i++){
      if(this.state.indicator[i] == true){
        style[i] = "aActive";
        break
      }
    }
    console.log(style);
  return (
        <div className = "dot-navi">
          <span onClick = {this.leftChange} >&lt;</span>
          <a className = "dot" onClick = {() => this.handleChange(0)}><div className={style[0]}></div></a>
          <a className = "dot" onClick = {() => this.handleChange(1)}><div className={style[1]}></div></a>
          <a className = "dot" onClick = {() => this.handleChange(2)}><div className={style[2]}></div></a>
          <a className = "dot" onClick = {() => this.handleChange(3)}><div className={style[3]}></div></a>
          <a className = "dot" onClick = {() => this.handleChange(4)}><div className={style[4]}></div></a>
          <span onClick = {this.rightChange}>&gt;</span>
        </div>
  )
}
}

export default App;
