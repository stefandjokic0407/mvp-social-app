import { useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
/**
 * Custom hook for all logic associated with the Carousel Component
 * @function useCarousel
 * @param {Object[]} elements - An array of items or cards to be displayed in the carousel
 * @returns {Object} - Returns an object of carousel state values and functions (handlers,getOrder,previousSlide,nextSlide,jumpToSlide)
 */
export function useCarousel({ elements }) {
	const numItems = elements.length || 1
	const [position, setPosition] = useState(0)
	const [shouldSlide, setShouldSlide] = useState(false)
	const [direction, setDirection] = useState()
	useEffect(() => {
		setShouldSlide(false)
	}, [shouldSlide])
	useEffect(() => {
		setDirection()
	}, [direction])
	const handlers = useSwipeable({
		onSwipedLeft: () => nextSlide(),
		onSwipedRight: () => previousSlide(),
		preventDefaultTouchmoveEvent: true,
		trackMouse: true,
	})
	const getOrder = (itemIndex) => {
		if (itemIndex - position < 0) {
			return numItems - Math.abs(itemIndex - position)
		}
		return itemIndex - position
	}
	const previousSlide = () => {
		setShouldSlide(true)
		setDirection('previous')
		setPosition(position === 0 ? numItems - 1 : position - 1)
	}
	const nextSlide = () => {
		setShouldSlide(true)
		setDirection('next')
		setPosition(position === numItems - 1 ? 0 : position + 1)
	}
	const jumpToSlide = (newSlide) => {
		position !== newSlide && setShouldSlide(true)
		setPosition(position === newSlide ? position : newSlide)
		setDirection(position < newSlide ? 'next' : 'previous')
	}
	// Carousel state values
	const carouselState = {
		position,
		shouldSlide,
		direction,
	}
	return {
		carouselState,
		handlers,
		getOrder,
		previousSlide,
		nextSlide,
		jumpToSlide,
	}
}
