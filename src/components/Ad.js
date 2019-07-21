import React from 'react';
import styled from 'styled-components';

export default function(props) {
	return (
		<Div className="ad-container">
			<div className="ad">
				<img alt={'ad'} src={`http://localhost:3000/ads/?r=${props.value}`} />
			</div>
			<div className={'ad-details'}>
				<p>Ad</p>
				<p>A word from our sponsors</p>
			</div>
		</Div>
	);
}

const Div = styled.div`
	width: 320px;

	.ad {
		border: 1px solid rgba(0, 0, 0, 0.8);
	}

	.ad-details {
		margin: 20px;
		line-height: 1.5;
	}

	.ad img {
		display: block;
		width: fit-content;
		height: 200px;
		margin: auto;
	}

	p {
		margin: 0px;
	}
`;
