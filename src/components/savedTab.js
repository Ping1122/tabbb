import React, { Component } from 'react';

class SavedTab extends Component {

	render() {
		let title = this.props.savedTab.title;
	    if (title.length >= 25) {
	    	title = `${title.substring(0, 47)}...`
	    }
	    return (
	     	<button 
	     		type="button" 
	     		className="list-group-item list-group-item-action" 
	     		onClick={() => this.props.handleClickTab(this.props.savedTab)}
	     	>
	     		{title}
	     	</button>
	    );
	}
}

export default SavedTab;