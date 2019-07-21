import React from 'react';
import styled from 'styled-components';

export default function(props) {
	return props.loading ? (
		<Div className={'loader-container'}>
			<div className="loader" />
			<h3>Loading...</h3>
		</Div>
	) : null;
}

const Div = styled.div`
	width: 100%;
	padding: 32px;

	.loader {
		border-radius: 50%;
		border-top: 16px solid #eee;
		border-right: 16px solid #bbb;
		border-bottom: 16px solid #888;
		border-left: 16px solid #555;
		width: 64px;
		height: 64px;
		animation: spin 1s linear infinite;
		margin: auto;
	}

	h3 {
		padding-top: 8px;
		text-align: center;
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
