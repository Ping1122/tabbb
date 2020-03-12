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
    this.handleTabClose = this.handleTabClose.bind(this);
    this.removeTabByReference = this.removeTabByReference.bind(this);
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
    if (this.state.savedTabs.readLater.includes(tab)) {
      this.removeTabByReference(tab, "readLater");
    }
  }

  handleTabClose(tab) {
    if (this.removeTabByReference(tab.id, "readLater")) return;
    if (this.removeTabByReference(tab.id, "bookmark")) return;
    for (let field in this.state.savedTabs.customized) {
      if (this.removeTabByReference(tab.id, "customized", field)) return;
    }
  }

  removeTabByReference(tab, category, customizedCategory=null) {
    let tabList = this.state.savedTabs[category];
    if (customizedCategory) tabList = tabList[customizedCategory];
    const index = tabList.indexOf(tab);
    if (index === -1) {
      return false;
    }
    let temp = tabList.slice();
    temp.splice(index, 1);
    let savedTabs = {...this.state.savedTabs};
    if (category === "customized") {
      savedTabs.customized[customizedCategory] = temp;
    }
    else {
      savedTabs[category] = temp;
    }
    this.setState({savedTabs});
    chrome.runtime.sendMessage(
      {
        type: 'removeTab',
        message: {category, customizedCategory, index}
      }, 
      (response) => {console.log(response);}
    );
    return true;
  }

  render() {
    return (
      <div className="popupContainer">
        <Nav />
        <Body savedTabs={this.state.savedTabs} handleClickTab={this.handleClickTab}/>
      </div>
    );
  }
}

export default App;
