import React from "react";

class Speedo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        speed: 0
      };
    }
  
    render() {
      return (
        <div className="speedometer">
          <div className="needle" style={{ transform: `rotate(${this.state.speed}deg)` }}></div>
          <div className="speed">{this.state.speed} mph</div>
          <button onClick={() => this.setState({ speed: this.state.speed + 10 })}>Increase Speed</button>
          <button onClick={() => this.setState({ speed: this.state.speed - 10 })}>Decrease Speed</button>
        </div>
      );
    }
  }
  
  export default Speedo;
  