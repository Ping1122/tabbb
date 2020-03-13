/*global chrome*/
import React, { Component } from 'react';
import SavedTab from './savedTab';
import OpenAllButtons from './openAllButtons';

class Body extends Component {

	renderSavedTabs() {
		chrome.extension.getBackgroundPage().console.log("body renderSavedTabs");
		chrome.extension.getBackgroundPage().console.log(this.props.tabList);
	    return this.props.tabList.map(tab => {
	        return (
	        	<li class="list-group-item">
			        <SavedTab 
			        	key={tab.id} 
			        	savedTab={tab} 
			        	handleClickTab={this.props.handleClickTab}
			        	handleTabClose={this.props.handleTabClose}
			        />
		        </li>
		    );
	    });
	}

	render() {
		return (
			<>	
				{(this.props.tabList.length !== 0)? 
					(<ul className="list-group">
	          			{this.renderSavedTabs()}
	        		</ul>) : "No saved Tabs"
        		}
        		<br />
        		<OpenAllButtons 
        			tabList={this.props.tabList}
        			handleOpenAll={this.props.handleOpenAll}
        		/>
			</>
		);
	}
}

export default Body;