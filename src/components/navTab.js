import React, { Component } from 'react';

class NavTab extends Component {

	render() {
		let styleClass = this.props.selected? "nav-link active" : "nav-link"; 
		return (
			<li className="nav-item">
            	<a 
            		href="#" 
            		className={styleClass}
            		onClick={() => this.props.selectNavTab(this.props.id)}
            	>
            		{this.props.name}
            	</a>
        	</li>
		);
	}
}

export default NavTab;