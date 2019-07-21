import React from 'react';
import styled from 'styled-components';

export default function(props) {
	return (
		<Div className="product-container">
			<div className="product">
				<div className={'product-img'}>
					<div className={'img-wrapper'}>
						<p style={{ fontSize: `${props.size}px` }}>{props.face}</p>
					</div>
				</div>
			</div>
			<div className={'product-details'}>
				<p>{props.price}</p>
				<p>{props.date}</p>
			</div>
		</Div>
	);
}

const Div = styled.div`
	width: 320px;

	.product {
		border: 1px solid rgba(0, 0, 0, 0.8);
	}

	.product-details {
		margin: 20px;
		line-height: 1.5;
	}

	.product-img {
		display: block;
		width: fit-content;
		height: 200px;
		margin: auto;
	}

	.img-wrapper {
		display: table-cell;
		height: inherit;
		vertical-align: middle;
	}

	p {
		margin: 0px;
	}
`;
