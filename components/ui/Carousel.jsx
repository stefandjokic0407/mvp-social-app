import React from 'react'
import styled from 'styled-components'
import { array, number, string } from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

// custom hooks
import { useCarousel } from '../../hooks/useCarousel'

const useStyles = makeStyles((theme) => ({
	accordion: {
		height: '30px',
		minHeight: '30px',
	},
	details: {
		padding: '8px 16px',
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
}))

// Styled Components via Emotion
const CarouselSlotWrapper = styled.div`
	display: flex;
	flex-direction: row;
	margin: 0 auto;
	overflow: hidden;
	width: 100%;
`
const CarouselSlot = styled.div`
	flex: 1 0 100%; /* For mobile, always have only one card/item visible at a time */
	font-size: 16px;
	order: ${(props) => props.order};
	text-align: center;
	transition: ${({ isSliding }) => (isSliding ? 'none' : 'transform .5s ease')};
	width: 100%;
	transform: ${({ direction, isSliding }) => {
		if (!isSliding) return 'translateX(calc(0%))'
		if (direction === 'previous') return 'translateX(calc(-100%))'
		return 'translateX(100%)'
	}};
	@media screen and (min-width: 800px) {
		flex: ${({ numItemsToDisplay }) =>
			numItemsToDisplay === 1 ? '1 0 100%' : `1 0 ${parseInt(100 / numItemsToDisplay, 10)}%`};
		font-size: 19px;
	}
`
const CarouselWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: auto;
`
// const Button = `
//     cursor: pointer;
//     height: 50px;
//     opacity: .7;
//     padding-left: 30px;
//     transition: all .4s ease;
//     width: 50px;
//     &:hover {
//         opacity: 1;
//     }
// `
// const PreviousButton = styled.div`
// 	${Button}
// 	display: none;
// 	transform: rotate(180deg);
// 	@media screen and (min-width: 600px) {
// 		display: block;
// 	}
// `
// const NextButton = styled.div`
// 	${Button}
// 	display: none;
// 	@media screen and (min-width: 600px) {
// 		display: block;
// 	}
// `

const Item = styled.div`
	background-image: ${(props) => `url(${props.img})`};
	background-position: center;
	background-size: cover;
	height: ${({ imgHeight }) => imgHeight};
	position: relative;
	text-align: center;
`
const AccordionWrapper = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	border-radius: 50%;
	color: ${({ theme }) => theme.colors.gray.base800};
	margin: 0 auto;
	opacity: 0.8;
	width: 90%;
	position: absolute;
	top: 10px;
	left: 0;
	right: 0;
`

const DotsWrapper = styled.div`
	margin: auto;
	margin-bottom: 15px;
	margin-top: -40px;
	position: relative;
	text-align: center;
	width: 100%;
	z-index: 10;
`
const Dot = styled.div`
	cursor: pointer;
	background: ${({ fillDot, fillDotColor }) => (fillDot ? (fillDotColor ? fillDotColor : '#FFF') : '#000')};
	border: 1px solid #fff;
	border-color: ${({ borderColor }) => borderColor || '#222333'};
	border-radius: 50%;
	display: inline-block;
	height: 12px;
	margin: 0 5px;
	width: 12px;
	@media screen and (min-width: 600px) {
		height: 15px;
		width: 15px;
	}
`

Carousel.propTypes = {
	borderColor: string,
	elements: array.isRequired,
	fillDotColor: string,
	numItemsToDisplay: number,
}

export function Carousel({
	elements,
	numItemsToDisplay = 1,
	fillDotColor,
	borderColor,
	imgHeight = '350px',
	showTitleList = true,
}) {
	const classes = useStyles()
	// const [open, setOpen] = useState(false)

	// const handleClick = () => {
	// 	setOpen(!open)
	// }

	const {
		carouselState: { position, shouldSlide, direction },
		handlers,
		getOrder,
		// previousSlide,
		// nextSlide,
		jumpToSlide,
	} = useCarousel({ elements })

	return (
		<>
			<CarouselWrapper {...handlers}>
				{/* <PreviousButton onClick={previousSlide}>
					<ChevronBlock />
				</PreviousButton> */}
				<CarouselSlotWrapper>
					{elements.map((element, i) => {
						return (
							<CarouselSlot
								direction={direction}
								isSliding={shouldSlide}
								order={getOrder(i)}
								numItemsToDisplay={numItemsToDisplay}
								key={i}
							>
								<Item img={element.image} imgHeight={imgHeight}>
									{showTitleList && (
										<AccordionWrapper>
											<Accordion>
												<AccordionSummary
													expandIcon={<ExpandMoreIcon />}
													aria-controls="panel1a-content"
													id="panel1a-header"
													className={classes.accordion}
												>
													<Typography>{element.name}</Typography>
												</AccordionSummary>
												<AccordionDetails className={classes.details}>
													<Typography>{element.description}</Typography>
												</AccordionDetails>
											</Accordion>
										</AccordionWrapper>
									)}
								</Item>
							</CarouselSlot>
						)
					})}
				</CarouselSlotWrapper>
				{/* <NextButton onClick={nextSlide}>
					<ChevronBlock />
				</NextButton> */}
			</CarouselWrapper>

			{showTitleList && (
				<DotsWrapper>
					{elements.map((element, i) => {
						return (
							<Dot
								fillDot={position === i}
								key={i}
								onClick={() => jumpToSlide(i)}
								fillDotColor={fillDotColor}
								borderColor={borderColor}
							/>
						)
					})}
				</DotsWrapper>
			)}
		</>
	)
}
