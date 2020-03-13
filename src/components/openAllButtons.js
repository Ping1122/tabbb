import React, { Component } from 'react';

class OpenAllButtons extends Component {

	render() {
		return (
			<button 
				type="button" 
				className="btn btn-primary"
				onClick={() => this.props.handleOpenAll(this.props.tabList)}
			>
				Open All Tabs
			</button>
		);
	}
}

export default OpenAllButtons;