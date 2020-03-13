import React, { Component } from 'react';

class SavedTab extends Component {

	render() {
		let title = this.props.savedTab.title;
	    if (title.length >= 25) {
	    	title = `${title.substring(0, 47)}...`
	    }
	    return (
	    	<div className="row">
		    	<div className="col-10">
			     	<button 
			     		type="button" 
			     		className="list-group-item list-group-item-action" 
			     		onClick={() => this.props.handleClickTab(this.props.savedTab)}
			     	>
			     		{title}
			     	</button>
			     </div>
			     <div className="col-2">
			     	<button 
			     		type="button" 
			     		className="close" 
			     		aria-label="Close"
			     		onClick={() => this.props.handleTabClose(this.props.savedTab)}
			     	>
						<span aria-hidden="true">&times;</span>
					</button>
			     </div>
			</div>
	    );
	}
}

export default SavedTab;