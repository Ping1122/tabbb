/*global chrome*/
import React, { Component } from 'react';
import SavedTab from './savedTab';
import OpenAllButtons from './openAllButtons';

class Body extends Component {

	renderSavedTabs() {
		chrome.extension.getBackgroundPage().console.log(this.props.savedTabs)
	    return this.props.savedTabs.readLater.map(tab => {
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
				<ul className="list-group">
          			{this.renderSavedTabs()}
        		</ul>
        		<OpenAllButtons />
			</>
		);
	}
}

export default Body;