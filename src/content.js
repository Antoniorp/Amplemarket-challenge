/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";
import "./content.css";
import templates from "./templates.json";

class Main extends React.Component {
  state = {
    visible: false,
    composeView: null,
    clientX: 0,
    clientY: 1
  };

  componentDidMount() {
    const self = this;

    document.body.addEventListener("click", this.handleGlobalClick, true);

    InboxSDK.load(2, "sdk_Attempt1_a09cf27b23").then(function(sdk) {
      // the SDK has been loaded, now do something with it!
      sdk.Compose.registerComposeViewHandler(function(composeView) {
        self.setState({ composeView: composeView });

        composeView.addButton({
          title: "Template button",
          iconUrl:
            "https://lh5.googleusercontent.com/itq66nh65lfCick8cJ-OPuqZ8OUDTIxjCc25dkc4WUT1JG8XG3z6-eboCu63_uDXSqMnLRdlvQ=s128-h128-e365",
          onClick: function(event) {
            self.toggleVisible(event);
          }
        });

        composeView.on("destroy", function(event) {
          self.closeDiv(event);
        });
      });
    });
  }

  handleGlobalClick = event => {
    const { clientX, clientY } = event;

    if (this.state.visible) {
      return;
    }

    this.setState({
      clientX,
      clientY
    });
  };

  closeDiv = event => {
    this.setState({
      visible: false
    });
  };

  toggleVisible = event => {
    this.setState({
      visible: !this.state.visible,
      composeView: event.composeView
    });
  };

  handleClick = text => {
    const { composeView } = this.state;
    composeView.setBodyText(text);
  };

  render() {
    const { visible, composeView, clientX, clientY } = this.state;

    var templateKeys = Object.keys(templates);

    const WIDTH = 150;
    const HEIGHT = 250;
    const styles = {
      position: "fixed",
      width: WIDTH,
      height: HEIGHT,
      boxShadow: "0 10px 10px rgba(0,0,0,.12)",
      backgroundColor: "PapayaWhip",
      left: clientX - WIDTH / 2,
      top: clientY - HEIGHT - 50,
      zIndex: 99999999
    };

    if (visible) {
      return (
        <div style={styles}>
          <span>Templates</span>

          {templateKeys.map((key, index) => {
            return (
              <p>
                <a onClick={() => this.handleClick(templates[key])} key={key}>
                  {key}
                </a>
              </p>
            );
          })}
        </div>
      );
    }

    return null;
  }
}

const app = document.createElement("div");
app.id = "my-extension-root";
document.body.appendChild(app);
ReactDOM.render(<Main />, app);
