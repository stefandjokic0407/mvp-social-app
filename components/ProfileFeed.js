import React from 'react'
import styled from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

import SimpleProfileFeedCard from './ui/SimpleProfileFeedCard'

dayjs.extend(relativeTime)

const CardWrapper = styled.div`
	display: grid;
	grid-gap: 10px;
	grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
	margin: 0 auto 6rem;
	width: 100%;
`

export default function ProfileFeed({ searchText, totyms }) {
	return (
		<CardWrapper>
			{totyms &&
				totyms
					.filter((totym) => totym.title.toLowerCase().includes(searchText.toLowerCase()))
					.map((totym) => <SimpleProfileFeedCard key={totym.id} totym={totym} />)}
		</CardWrapper>
	)
}
