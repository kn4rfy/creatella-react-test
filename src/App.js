import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import request from 'umi-request';
import update from 'immutability-helper';
import Loader from './components/Loader';
import Product from './components/Product';
import Ad from './components/Ad';

const productsState = { products: [], page: 1, sort: '', loading: false, noMoreProducts: false };

export default function() {
	const [state, setState] = useState(productsState);

	useEffect(getProducts, [state.sort]); // This calls getProducts() after render and calls getProducts() when state.sort is updated

	function getProducts() {
		setState({
			...state,
			loading: true, // Show the loading spinner
		});

		request(
			`http://localhost:3000/products?_page=${state.page}&_limit=20&_sort=${state.sort}`
		).then(products => {
			if (products.length === 0) {
				// Checks if there aro no more products
				setState({
					...state,
					loading: false, // Terminates loading
					noMoreProducts: true, // Show the end of catalogue text
				});
			} else {
				if (products.length === 20) {
					// Checks if there are 20 products
					products.push({
						ad: true,
						id: ((Math.random() * 1000) | 0).toString(),
						value: (Math.random() * 10) | 0,
						// Ads must never be seen twice in a row.
						// Not the exact solution but works
						// I just take look at the handle-ads.js and the max is 10 so I set the max for random to 10
					}); // Insert Ad every 20 products
				}

				setState({
					...state,
					products: update(state.products, {
						// Push the result products to the products state
						$push: products,
					}),
					page: (state.page += 1), // Update page # for the next query
					loading: false, // Terminates loading
				});
			}
		});
	}

	// Called when scrolling the page
	function onScroll(data) {
		if (
			data.target.offsetHeight + data.target.scrollTop >= data.target.scrollHeight * 0.6 && // Triggered when scrolling past 60% of the page height to get more products
			!state.loading && // Works like debounce but it only waits for loading to finish before getting more products
			!state.noMoreProducts // Stops getting more if end of catalogue is reached
		) {
			getProducts();
		}
	}

	// Called when selecting a sorting option
	function onChangeSorting(event) {
		// Reset state.products, state.page
		// Update state.sort and trigger useEffect() to call getProducts()
		setState({
			products: [],
			page: 1,
			sort: event.target.value,
		});
	}

	// Custom date formatter
	function formatDateToRelative(date) {
		const pastDate = new Date(date); // Parse the string date in to Date object
		const currentDate = new Date(); // Get current date
		const diffInSeconds = (currentDate.getTime() - pastDate.getTime()) / 1000; // Calculate difference in seconds
		const diffInDays = parseInt(diffInSeconds / 86400); // Calculate difference in days

		if (diffInSeconds < 60) {
			// Triggers when diffInSeconds is lesser than a minute
			const seconds = parseInt(diffInSeconds);

			return `${seconds}${seconds > 1 ? ' seconds' : ' second'} ago`; // Formatting for plural or singular
		} else if (diffInSeconds < 3600) {
			// Triggers when diffInSeconds is more than a minute but is lesser than an hour
			const minutes = parseInt(diffInSeconds / 60);

			return `${minutes}${minutes > 1 ? ' minutes' : ' minute'} ago`; // Formatting for plural or singular
		} else if (diffInSeconds < 86400) {
			// Triggers when diffInSeconds is more than an hour but is lesser than a day
			const hours = parseInt(diffInSeconds / 3600);

			return `${hours}${hours > 1 ? ' hours' : ' hour'} ago`; // Formatting for plural or singular
		} else if (diffInSeconds >= 86400) {
			// Triggers when diffInSeconds is more or equal than a day
			if (diffInDays > 7) {
				// Check if the relative time is more than a week
				return date.toString(); // Return the full date instead
			} else {
				return `${diffInDays}${diffInDays > 1 ? ' days' : ' day'} ago`; // Formatting for plural or singular
			}
		}
	}

	// Renders the Products or Ads
	function renderProducts(data) {
		const price = `$${data.price / 100}`; // Convert cents to dollars

		if (data.ad) {
			// Check if the data is an Ad and renders an Ad component instead
			return <Ad key={data.id} {...data} />;
		}

		return <Product key={data.id} {...data} price={price} date={formatDateToRelative(data.date)} />;
	}

	return (
		<Div onScroll={onScroll}>
			<header className={'header'}>
				<h1>Products Grid</h1>
				<p>
					Here you're sure to find a bargain on some of the finest ascii available to purchase. Be
					sure to peruse our selection of ascii faces in an exciting range of sizes and prices.
				</p>
				<div className={'sort'}>
					<span>Sort by: </span>
					<select onChange={onChangeSorting}>
						<option value="">Default</option>
						<option value="size">Size</option>
						<option value="price">Price</option>
						<option value="id">Id</option>
					</select>
				</div>
			</header>

			<section className="products">{state.products.map(renderProducts)}</section>

			<Loader loading={state.loading} />

			{state.noMoreProducts ? ( // Renders the end of catalogue text
				<h2 className={'catalogue-end'}>~ end of catalogue ~</h2>
			) : null}
		</Div>
	);
}

const Div = styled.div`
	height: ${window.innerHeight}px;
	overflow-y: scroll;

	.header {
		position: fixed;
		width: 100%;
		padding: 0 32px;
		padding-bottom: 16px;
		background: #fafdff;
	}

	.products {
		display: inline-grid;
		grid-row-gap: 32px;
		grid-template-columns: auto auto auto;
		justify-content: space-around;
		width: 100%;
		margin-top: 180px;
	}

	.catalogue-end {
		padding-top: 8px;
		text-align: center;
	}
`;
