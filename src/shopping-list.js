import React, { Component } from 'react';

import NewItem from './new-item';
import Item from './item';

class ShoppingList extends Component {
	constructor(props) {
		super(props)

		this.state = {
			items      : JSON.parse(localStorage.getItem('items')),
			activeView : 'all'
		}
	}

	/**
	 * Add new item to list
	 *
	 * @param {Object} newItem - The new item in the list.
	 */
	handleAddItem = (newItem) => {
		this.saveItems([...this.state.items, newItem])
	}

	/**
	 * Edit selected item value
	 *
	 * @param {Object} editedItem - The edited item in the list.
	 */
	handleEditItem = (editedItem) => {
		const editedItemId  = editedItem.id
		const editedItemVal = editedItem.value

		const itemsToSave = this.state.items.filter((item) => (
			item.id === editedItemId 
			? (
				item.value = editedItemVal
			) : (
				item.value
			)
		))

		this.saveItems(itemsToSave)		
	}

	/**
	 * Remove selected item
	 *
	 * @param {String} id - The ID of the selected item.
	 */
	handleRemoveItem = (id) => {
		const filteredItems = this.state.items.filter((item) => (item.id !== id)) 

		this.saveItems(filteredItems)
	}

	/**
	 * Toggle selected item completed property
	 *
	 * @param {String} id - The ID of the selected item.
	 */
	handleToggleCompleted = (id) => {
		const itemsToSave = this.state.items.filter((item) => {
			item.id === id
			? (
				item.isCompleted = !item.isCompleted
			) : (
				item.isCompleted = item.isCompleted
			)

			return item
		})

		this.saveItems(itemsToSave)
	}

	/**
	 * Set items completed property to true if there is one or more completed item or to false if all items are completed
	 *
	 * @param {Boolean} isAllCompleted - Shows is all items are completed.
	 */
	handleSetAllCompleted = (isAllCompleted) => (e) => {
		e.preventDefault()

		const itemsToSave = this.state.items.filter((item) => { 
			isAllCompleted
			? (
				item.isCompleted = false
			) : (
				item.isCompleted = true
			)

			return item
		})

		this.saveItems(itemsToSave)
	}

	/**
	 * Remove all completed items
	 *
	 */
	handleRemoveCompletedItems = (e) => {
		e.preventDefault()

		const itemsToSave = this.state.items.filter((item) => { return item.isCompleted === false })

		this.saveItems( itemsToSave )
	}

	/**
	 * Set view to list, can be 'all', 'active' or 'completed'
	 *
	 */
	handleSetView = (e) => {
		this.setState({
			activeView: e.target.textContent
		});
	}

	/**
	 * Set active class to clicked view button
	 *
	 * @param {String} text - Clicked button text.
	 * @returns {String}
	 */
	getButtonClass = (text) => {
		return `shopping-list__button ${ this.state.activeView === text ? 'is-active' : null}`
	}

	/**
	 * Group items to show, based on selected active view, can be 'all', 'active' or 'completed'
	 *
	 * @returns {Object} - items to show in list
	 */
	getItemsToRender() {
		let items = []

		switch(this.state.activeView) {
			case 'active' :
				items = this.getItemsCompleted(true)
				break
			case 'completed' :
				items = this.getItemsCompleted(false)
				break
			default :
				items = this.state.items
		}

		return items
	}

	/**
	 * Get items. If true returns completed items and vice versa.
	 *
	 * @param {Boolean} isCompleted - item completed status.
	 * 
	 * @returns {Object} - filtered items
	 */
	getItemsCompleted(isCompleted) {
		return this.state.items.filter((item) => ( !item.isCompleted === isCompleted ))
	}

	/**
	 * Set items to state and save in local storage
	 *
	 * @param {Object} items - Items to set and save.
	 */
	saveItems = (items) => {
		this.setState({
			items: items
		})

		localStorage.setItem('items', JSON.stringify(items));
	}

	render() {
		const { items } = this.state;
		
		const itemsLength          = items.length;
		const activeItemsLength    = this.getItemsCompleted(true).length
		const completedItemsLength = this.getItemsCompleted(false).length

		const isAllCompleted = itemsLength === completedItemsLength

		const itemsToRender = this.getItemsToRender()

		return (
			<div className="shopping-list">
				<div className="shopping-list__head">
					<div className="shopping-list__head-action">
						<button 
							className="button-check" 
							onClick={this.handleSetAllCompleted(isAllCompleted)} 
							disabled={itemsLength < 1 ? true : false}
						>
							{isAllCompleted || itemsLength < 1 ? <i className="ico-check"></i> : null}
						</button>
					</div>

					<div className="shopping-list__head-content">
						<NewItem onAddItem={this.handleAddItem} />
					</div>
				</div>

				<div className="shopping-list__body">
					<div className="items">
						{
							items.length < 1 
							? (
								<div className="items__alert">No items here</div>
							) : (
								itemsToRender.map( (item, index) => (
									<Item 
										key={item.id}
										item={item}
										onRemoveItem={this.handleRemoveItem}
										onToggleCompleted={this.handleToggleCompleted}
										onEditItem={this.handleEditItem}
									/>
								))
							)
						}
					</div>
				</div>

				<div className="shopping-list__foot">
					<div className="shopping-list__foot-meta">
						{activeItemsLength + ` item${activeItemsLength > 1 ? 's' : ''} left`}
					</div>
					
					<div className="shopping-list__foot-actions">
						<button 
							className={this.getButtonClass('all')}
							onClick={this.handleSetView}
						>
							all
						</button>

						<button 
							className={this.getButtonClass('active')}
							onClick={this.handleSetView}
						>
							active
						</button>

						<button 
							className={this.getButtonClass('completed')}
							onClick={this.handleSetView}
						>
							completed
						</button>
						
					</div>

					<div className="shopping-list__foot-aside">
						<button 
							className="shopping-list__button" 
							disabled={completedItemsLength <= 0 ? true : false}
							onClick={this.handleRemoveCompletedItems}
						>
							Clear completed
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ShoppingList;