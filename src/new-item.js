import React, { Component } from 'react';
import uuid from 'react-uuid'

class NewItem extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value: ''
		}
	}

	/**
	 * Create new item and pass to parent component
	 *
	 */
	handleSubmit = (e) => {
		e.preventDefault()

		if ( !this.state.value.length ) {
			return
		}

		const newItem = { id: uuid(), value: this.state.value, isCompleted: false }

		this.props.onAddItem(newItem);

		this.setState({
			value: ''
		})
	}

	/**
	 * Set new value on input
	 *
	 */
	handleChange = (e) => {
		this.setState({
			value : e.target.value
		})
	}

	render() {
		const { value } = this.state

		return (
			<div className="new-item">
				<form method="post" onSubmit={this.handleSubmit}>
					<input 
						type="text" 
						className="new-item__field" 
						placeholder="What I need to buy today" 
						value={value} 
						onChange={this.handleChange} 
					/>
				</form>
			</div>
		);
	}
}

export default NewItem;