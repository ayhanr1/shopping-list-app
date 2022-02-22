import React, { Component } from 'react';
import TextEdit from './text-edit.js';

class Item extends Component {
	/**
	 * Pass clicked item ID to parent component to delete item
	 *
	 */
	handleRemove = (e) => {
		e.preventDefault()

		this.props.onRemoveItem(this.props.item.id)
	}

	/**
	 * Pass clicked item ID to parent component to toggle completed
	 *
	 */
	handleToggleCompleted = (e) => {
		e.preventDefault()

		this.props.onToggleCompleted(this.props.item.id)
	}

	/**
	 * Pass clicked item value to parent component
	 *
	 * @param {String} value - Edited item value.
	 */
	handleEdit = ( value ) => {
		const editedItem = {id: this.props.item.id, value, isCompleted: this.props.item.isCompleted}

		this.props.onEditItem(editedItem)
	}

	render() {
		const { value, isCompleted } = this.props.item

		return (

			<div className={`item ${isCompleted ? 'is-completed' : ''}`}>
				<div className="item__status">
					<button 
						className="button-check" 
						onClick={this.handleToggleCompleted}
					>
						{ isCompleted ? <i className="ico-check"></i> : null }
					</button>
				</div>

				<div className="item__title">
					<TextEdit 
						value={value} 
						onEditItem={this.handleEdit} 
					/>
				</div>
				
				<div className="item__actions">
					<button 
						className="item__button-remove" 
						onClick={this.handleRemove}
					>
						<i className="ico-trash"></i>
					</button>
				</div>
			</div>
		);
	}
}

export default Item;