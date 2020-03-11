/*global chrome*/
import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Nav from "./components/nav";
import Body from "./components/body";

class App extends Component {
  constructor() {
    super();
    this.state = {
      savedTabs : {
        readLater: [],
        bookmark: [],
        customized: {},
      },
    };
    this.handleClickTab = this.handleClickTab.bind(this);
  }

  componentDidMount() {
    console.log("app mounted");
    chrome.runtime.sendMessage(
      {type: 'requestSavedTabs'}, 
      (response) => {
        console.log(response);
        if (response) {
          this.setState({
            savedTabs: response
          });
        }
      }
    );
  }

  handleClickTab(tab) {
    chrome.tabs.create({'url': tab.url});
  }

  render() {
    return (
      <>
        <Nav />
        <Body savedTabs={this.state.savedTabs} handleClickTab={this.handleClickTab}/>
      </>
    );
  }
}

export default App;
