import React, { Component } from 'react';
import NavTab from './navTab';
import NavDropdown from './navDropdown';

class Nav extends Component {

	render() {
		return (
			<>	
				<ul class="nav nav-tabs">
					<NavTab
						id={"readLater"}
						name={"Read Later"}
						selected={this.props.category==="readLater"}
						selectNavTab={this.props.selectNavTab}
					/>
					<NavTab
						id={"bookmark"}
						name={"Bookmark"} 
						selected={this.props.category==="bookmark"}
						selectNavTab={this.props.selectNavTab}
					/>
				</ul>
			</>
		);
	}
}

export default Nav;