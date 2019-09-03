import React from "react";
import ReactDOM from "react-dom";

class Clipboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        textValue: null
    }
  }
  handleInputChange = (event) => {
    this.setState({
        textValue : event.target.value 
    })
  }
  handleSubmit = () => {
      console.log("submitted")
      this.setState({
        textValue : ""
    })
  }
  render() {
    return (
      <div>
        <p>Hello child</p>
        <textArea>aaa</textArea>
        <input name="clipboardInput" value={this.state.textValue} onChange={this.handleInputChange} type="text" />
        <button type="button" onClick={this.handleSubmit}>Submit</button>
      </div>
    );
  }
}
export default Clipboard;
