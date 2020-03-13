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
      category : "readLater",
      customizedCategory : "",
      savedTabs : {
        readLater: [],
        bookmark: [],
        customized: {},
      },
    };
    this.selectNavTab = this.selectNavTab.bind(this);
    this.getCurrentCategory = this.getCurrentCategory.bind(this);
    this.handleClickTab = this.handleClickTab.bind(this);
    this.handleTabClose = this.handleTabClose.bind(this);
    this.handleOpenAll = this.handleOpenAll.bind(this);
    this.removeTabByReference = this.removeTabByReference.bind(this);
    this.removeReadLater = this.removeReadLater.bind(this);
  }

  componentDidMount() {
    chrome.runtime.sendMessage(
      {type: 'requestSavedTabs'}, 
      (response) => {
        if (response) {
          this.setState({
            savedTabs: response
          });
          chrome.extension.getBackgroundPage().console.log("app componentDidMount");
          chrome.extension.getBackgroundPage().console.log(response);
        }
      }
    );
  }

  selectNavTab(category) {
    if (category !== this.state.category) {
      this.setState({category});
    }
  }

  getCurrentCategory() {
    let target = this.state.savedTabs[this.state.category];
    if (this.state.customizedCategory) {
      target = target[this.state.customizedCategory];
    }
    return target;
  }

  handleClickTab(tab) {
    chrome.tabs.create({'url': tab.url});
    if (this.state.category === "readLater") {
      this.removeTabByReference(tab);
    }
  }

  handleTabClose(tab) {
    this.removeTabByReference(tab);
  }

  handleOpenAll(tabList) {
    tabList.forEach(tab => {
      chrome.tabs.create({'url': tab.url});
    });
    if (this.state.category === "readLater") {
      this.removeReadLater();
    }
  }

  removeReadLater() {
    let savedTabs = {...this.state.savedTabs};
    savedTabs.readLater = [];
    this.setState({savedTabs});
    chrome.runtime.sendMessage(
      {type:"removeReadLater"}, 
      (response) => {console.log(response);}
    );
  }

  removeTabByReference(tab) {
    const {category, customizedCategory} = this.state;
    let tabList = this.getCurrentCategory();
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
        message: {
          category, 
          customizedCategory, 
          index
        }
      }, 
      (response) => {console.log(response);}
    );
    return true;
  }

  render() {
    return (
      <div className="popupContainer">
        <Nav 
          category={this.state.category} 
          selectNavTab={this.selectNavTab}
        />
        <Body 
          tabList={this.getCurrentCategory()} 
          handleClickTab={this.handleClickTab}
          handleTabClose={this.handleTabClose}
          handleOpenAll={this.handleOpenAll}
        />
      </div>
    );
  }
}

export default App;
