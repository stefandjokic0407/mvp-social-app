import React from "react";
import Link from "next/link";
import styled, { css } from 'styled-components'

const commonStyles = css`
	position: relative;
	width: 132px;
	height: 36px;
	margin: 0;
	user-select: none;
`
const LinearAnchorTag = styled.a`
	${commonStyles}
`;
const LinearButton = styled.button`
	${commonStyles}
	background: none;
	border: none;
`;
const LinearSpan = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 2;
`;
const ButtonText = styled.span`
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	z-index: 1;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #000;
	font-weight: 500;
`;

const CommonButton = ({ buttonText = "Home", startColor = "#ff4ecd", endColor = "#1a75ff" }) => (
	<>
		<LinearSpan>
			<svg width="132" height="36" viewBox="0 0 132 36" fill="none" xmlns="http://www.w3.org/2000/svg">
				<rect x="1.5" y="1.5" width="129" height="33" rx="6.5" stroke="url(#linearGradient)" strokeWidth="3"
				></rect>
				<defs>
					<linearGradient id="linearGradient" x1="5.86667" y1="18.8571" x2="110.978" y2="18.8571"
						gradientUnits="userSpaceOnUse">
						<stop stopColor={startColor}></stop>
						<stop offset="1" stopColor={endColor}></stop>
					</linearGradient>
				</defs>
			</svg>
		</LinearSpan>
		<ButtonText>{buttonText}</ButtonText>
	</>
)
export default function LinearGradientButton({ isButton = true, onClick = () => { }, path = '/', ...restOfProps }) {
	return (
		isButton
			?
			<LinearButton onClick={onClick}>
				<CommonButton {...restOfProps} />
			</LinearButton>
			:
			<Link href={path}>
				<LinearAnchorTag>
					<CommonButton {...restOfProps} />
				</LinearAnchorTag>
			</Link>
	)
}