import React from 'react'
import Link from 'next/link';
import styled, { css } from 'styled-components'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder'
import SendIcon from '@material-ui/icons/Send'

import Avatar from './Avatar'
import { Carousel } from './Carousel'
import FollowButton from './FollowButton'
import SocialSharingOptions from '../SocialSharingOptions'
import TotymFab from './TotymFab'
import { slugify } from '../../utils'
import Modal from '../Modal';
import { appUrl } from '../../utils/config';

dayjs.extend(relativeTime)

const StyledCard = styled.div`
	background-color: ${({ theme }) => theme.colors.white};
	box-shadow: 0px 5px 5px rgba(10, 10, 10, 0.2);
	min-height: 400px;
	margin: 10px auto;
	padding: 0;
	width: 100%;

	&:hover {
		box-shadow: 0px 8px 8px rgba(10, 10, 10, 0.3);
	}
`

const Title = styled(Link)``
const StyledLink = styled.a`
	color: ${({ theme }) => theme.colors.black.base};
	cursor: pointer;
	display: flex;
	font-size: 1.2rem;
	font-weight: 600;
	padding: 0 10px;

	&:hover {
		color: ${({ theme }) => theme.colors.gray.base600};
	}
`

const FlexRowSpace = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin: 0 auto;
	padding: 10px 10px 5px;
`
const UserInfoWrapper = styled.div`
	align-items: center;
	display: flex;
`
const Username = styled(Link)`
	color: ${({ theme }) => theme.colors.black.base};
	cursor: pointer;
	font-size: 0.8rem;
	overflow: hidden;

	&:hover {
		color: ${({ theme }) => theme.colors.primary.light};
	}
`
const ActionItemsWrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	margin-bottom: 0;
	width: 100%;
`
const baseButtonStyles = css`
	display: flex;
	margin: 0 2px;
`
const CollectionButton = styled.span`
	${baseButtonStyles}
	margin-left: 0;
`
const LeftWrapper = styled.div`
	display: flex;
	align-items: center;
`
const SavedByText = styled.span`
	font-size: 0.7rem;
`
const RightWrapper = styled.div`
	display: flex;
	align-items: center;
`
const ShareButton = styled.a`
	${baseButtonStyles}
	margin-right: 0;
`
const CreateButton = styled.span`
	${baseButtonStyles}
	margin-right: 0;
	height: 25px;
	width: 25px;
`
const CommentButton = styled.span`
	${baseButtonStyles}
	margin-right: 10px;
`
const UpdatedText = styled.span`
	font-size: 0.6rem;
	padding: 5px 10px;
`

const Card = ({ totym: { id, title, items, user, updatedAt } }) => {
	const [showModal, setShowModal] = React.useState(false);
	// const isFollowing = me?.following.map((follower) => follower.id === user.id).includes(true)
	const formattedUpdatedAt = dayjs(updatedAt).fromNow()
	const generatedSlug = slugify(title)

	const fullUrl = `${appUrl}/totym/${user.username}/${generatedSlug}/${id}`

	return (
		<StyledCard>
			<FlexRowSpace>
				<UserInfoWrapper>
					<Avatar user={user} />
					<Username href={`/u/${user.username}`}><a>{user.username}</a></Username>
					{/* {me && me.username !== user.username && (
						<FollowButton followingId={user.id} isFollowing={isFollowing} userId={me.id}>
							Follow
						</FollowButton>
					)} */}
				</UserInfoWrapper>
				<div>
					<Link
						href={{
							pathname: true ? '#/create' : '#/login',
							query: {
								title
							},
						}}
					>
						<CreateButton>
							<TotymFab />
						</CreateButton>
					</Link>
				</div>
			</FlexRowSpace>
			<Title
				href={{
					pathname: `/totym/${user.username}/${generatedSlug}/${id}`
				}}
			><StyledLink>
					{title}</StyledLink>
			</Title>
			<Carousel elements={items} numItemsToDisplay={1} fillDotColor="#fbfbfb" borderColor="#0a0a0a" />
			<FlexRowSpace>
				<ActionItemsWrapper>
					<LeftWrapper>
						<CollectionButton onClick={() => console.log('Save button clicked')}>
							<BookmarkBorderIcon />
						</CollectionButton>
						<SavedByText>Saved by [related user] and 102 others</SavedByText>
					</LeftWrapper>
					<RightWrapper>
						<div>
							<ShareButton onClick={() => setShowModal(true)}>
								<SendIcon />
							</ShareButton>
							<Modal
								onClose={() => setShowModal(false)}
								show={showModal}
								title="Share Totym"
							>
								<SocialSharingOptions imageUrl={items && items[0].image} title={title} url={fullUrl} username={user.username} />
							</Modal>
						</div>
					</RightWrapper>
				</ActionItemsWrapper>
			</FlexRowSpace>
			<FlexRowSpace>
				<UpdatedText>Updated: {formattedUpdatedAt}</UpdatedText>
			</FlexRowSpace>
		</StyledCard>
	)
}

export default Card
