import React, { Component, Fragment } from 'react';

class TextEdit extends Component {
	constructor(props) {
		super(props)

		this.state = {
			value    : this.props.value,
			showForm : false
		}
	}

	/**
	 * Toggle edit mode
	 *
	 */
	handleToggleVisible = (e) => {
		this.setState({
			showForm: !this.state.showForm
		})
	}

	/**
	 * Pass edited item value to parent component and toggle edit mode
	 *
	 */
	handleSubmit = (e) => {
		e.preventDefault()

		this.props.onEditItem( this.state.value )

		this.handleToggleVisible()
	}

	/**
	 * Set new value on input
	 *
	 */
	handleChange = (e) => {
		this.setState({
			value: e.target.value
		});
	}

	render() {
		const { value, showForm } = this.state

		return (
			<Fragment>
				{
					showForm 
					? (
						<form 
							action="?" 
							onSubmit={this.handleSubmit}
						>
							<input 
								type="text" 
								value={value} 
								onChange={this.handleChange} 
								autoFocus
							/>
						</form>
					) : (
						<div onDoubleClick={this.handleToggleVisible}>{value}</div>
					)
				}
			</Fragment>
		);
	}
}

export default TextEdit;