/**
 * External dependencies.
 */
import React from 'react';
import ShoppingList from './shopping-list';

function App() {
	return (
		<div className="app">
			<header className="app__head">
				<h1 className="app__title">My Shopping List</h1>
			</header>

			<div className="app__body">
				<ShoppingList />
			</div>

			<div className="app__foot">Double-click to edit an item</div>
		</div>
	);
}

export default App;
