import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import router from 'next/router';
import styled, { css } from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useSession } from 'next-auth/client';

import Avatar from './Avatar';
import BookMarkIcon from '../svgs/BookMarkIcon';
import CommentIcon from '../svgs/CommentIcon';
import EllipseMenuIcon from '../svgs/EllipseMenuIcon';
import EllipsesMenu from './EllipsesMenu';
import ShareModal from './ShareModal';
import { appUrl } from '../../utils/config';
import { slugify, truncateString } from '../../utils';
import { initializeApollo } from '../../apollo/client';
import { useCarousel } from '../../hooks/useCarousel';
import { CREATE_COLLECTION, DELETE_COLLECTION } from '../../graphql/mutations';
import {
  GET_COLLECTIONS_BY_USER,
  GET_COMMENT_COUNT_BY_TOTYM,
} from '../../graphql/queries';

dayjs.extend(relativeTime);

const StyledCard = styled.div`
  aspect-ratio: 7/8;
  background-blend-mode: overlay;
  background-image: url(${({ bgImage, position }) => bgImage[position].image}),
    linear-gradient(rgba(0, 0, 0, 0.21), rgba(0, 0, 0, 0.21));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  margin: 10px auto 0;
  min-height: 250px;
  padding: 0;
  position: relative;
  width: 100%;
  z-index: 1;

  /** Fallback for non aspect-ratio supported browsers */
  @supports not (aspect-ratio: 7 / 8) {
    min-height: 400px;
  }
`;

const baseAnchorStyles = css`
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
`;
const Title = styled(Link)``;
const StyledTitleAnchor = styled.a`
  ${baseAnchorStyles}
  display: flex;
  font-family: ${({ theme }) => theme.fontFamily.heading};
  font-style: normal;
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.25em;
  justify-content: center;
  padding: 0 1rem 10px;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  z-index: 2;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
const StyledItemName = styled.h4`
  bottom: 0;
  color: white;
  font-size: 1.1rem;
  font-weight: normal;
  line-height: 1.2em;
  padding: 2rem 2.5rem 0.5rem;
  position: absolute;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 100%;
`;
const ButtonWrapper = styled.div`
  bottom: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
  position: absolute;
  right: 0;
`;
const StyledBookMark = styled.button`
  align-items: center;
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4px 4px 0;
  z-index: 2;

  svg {
    fill: ${({ isMyBookmark, theme }) =>
      isMyBookmark ? theme.colors.white : 'none'};
  }
`;
const StyledComment = styled(StyledBookMark)``;
const StyledLabel = styled.span`
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  font-size: 0.75rem;
  font-style: normal;
  line-height: 1rem;
  justify-content: center;
  padding-top: 0.125rem;
`;
const FlexRowSpace = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  padding: 10px 10px 5px;
`;
const UserInfoWrapper = styled.div`
  align-items: center;
  display: flex;
`;
const Username = styled(Link)`
  overflow: hidden;
`;
const StyledUsernameAnchor = styled.a`
  ${baseAnchorStyles}
  display: flex;
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 1.1px;
  padding: 0 5px;
  margin-left: 2px;
  z-index: 2;

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
const ActionItemsWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;
const baseButtonStyles = css`
  display: flex;
  margin: 0 2px;
`;
const EllipseMenuIconWrapper = styled.span`
  ${baseButtonStyles}
  margin-right: 0;
  height: 25px;
  width: 25px;
  cursor: pointer;
  align-items: center;
`;
const ItemMiniName = styled.span`
  color: ${({ theme }) => theme.colors.gray.base900};
  font-style: normal;
  font-size: 0.9rem;
  line-height: 1rem;
  letter-spacing: -0.05px;
  white-space: pre-line;
  width: 100%;
  word-break: break-word;
  z-index: 2;
`;
const Description = styled(ItemMiniName)`
  font-size: 0.75rem;
  text-overflow: ellipsis;
`;
const UpdatedText = styled.span`
  font-size: 0.7rem;
  text-overflow: ellipsis;
`;
const AvatarSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SavedByContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 0.75rem;
  margin: 0 auto;
  padding: 10px 10px 5px;
`;
const AdditionalInfo = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
  border-radius: 0 0 5px 5px;
`;
const CarouselWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin: auto;
`;
const CarouselSlotWrapper = styled.div`
  display: flex;
  flex-flow: nowrap;
  margin: 0 auto;
  overflow: hidden;
  width: 100%;
`;
const CarouselSlot = styled.div`
  background: ${({
    isCurrent,
  }) => `linear-gradient(#0f0f0f, #a0a0a0) padding-box,
    linear-gradient(to bottom, ${
      isCurrent ? '#ffbc49, #ca330f' : '#a0a0a0, #a0a0a0'
    }) border-box`};
  border-radius: 0 0 5px 5px;
  border: 3px solid transparent;
  min-width: 32.5%;
  width: 100%;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-left: -10%;
  z-index: ${({ zIndex, isCurrent }) => (isCurrent ? 5 + zIndex : 5 - zIndex)};
  &:first-child {
    margin-left: 0;
  }
`;
const Item = styled.div`
  background-image: ${({ img }) => `url(${img})`};
  background-position: center;
  background-size: cover;
  background-color: ${({ theme }) => theme.colors.white};
  height: ${({ imgHeight }) => imgHeight};
`;

export default function FullImageMainCard({
  propPosition,
  shouldShowCarousel = true,
  totym,
  totym: { id, title, description, items, user, collection, updatedAt },
  totalComments = 0,
}) {
  const {
    carouselState: { position, shouldSlide, direction },
    handlers,
    getOrder,
    jumpToSlide,
  } = useCarousel({ elements: items });
  const determinedPosition = propPosition ? propPosition : position;
  const [session, loading] = useSession();
  const [anchorEl, setAnchorEl] = useState(null);
  const [ellipsesType, setEllipsesType] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bookMarks, setBookMarks] = useState(collection);
  const [commentCount, setCommentCount] = useState(totalComments);
  const [isExpand, setIsExpand] = useState(false);
  const [isBookMark, setIsBookMark] = useState(false);
  const apolloClient = initializeApollo();

  const generatedSlug = slugify(title);

  useEffect(() => {
    async function getCommentCount() {
      const { data } = await apolloClient.query({
        query: GET_COMMENT_COUNT_BY_TOTYM,
        variables: {
          totymId: id,
        },
      });
      setCommentCount(data.aggregateComment._count._all);
    }
    if (session) {
      getCommentCount();
    }
  }, [id]);

  const handleEllipsisMenuOpen = (event) => {
    if (session.user.id === user.id) {
      setEllipsesType(true);
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setAnchorEl(null);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getCollections = async () => {
    const { data } = await apolloClient.query({
      query: GET_COLLECTIONS_BY_USER,
      variables: {
        userId: session?.user.id,
        totymId: id,
      },
      fetchPolicy: 'network-only', // Doesn't check cache before making a network request
    });
    return data;
  };

  const handleBookMark = async () => {
    if (isBookMark) return;
    setIsBookMark(true);

    if (!session?.user.id) {
      router.push('/api/auth/signin');
    }
    const data = await getCollections();
    if (data.collections.length == 0) {
      const {
        data: { createCollection },
      } = await apolloClient.mutate({
        mutation: CREATE_COLLECTION,
        variables: {
          totym: { connect: { id: id } },
          user: { connect: { id: session.user.id } },
        },
      });
      setBookMarks([...bookMarks, createCollection]);
      setIsBookMark(false);
    } else {
      const {
        data: { deleteCollection },
      } = await apolloClient.mutate({
        mutation: DELETE_COLLECTION,
        variables: {
          id: data.collections[0].id,
        },
      });
      let deletedIndex = -1;
      let temp = [...bookMarks];
      temp.forEach((element, index) => {
        if (element.id == deleteCollection.id) {
          deletedIndex = index;
        }
      });
      if (deletedIndex > -1) {
        temp.splice(deletedIndex, 1);
        setBookMarks(temp);
        setIsBookMark(false);
      }
    }
  };

  const fullSharableUrl = `${appUrl}/totym/${user.username}/${generatedSlug}/${id}`;

  let isMyBookMark = false;
  if (bookMarks?.length > 0) {
    isMyBookMark = bookMarks.some(
      (element) => element.user.id == session?.user.id
    );
  }

  return (
    <div style={{ width: '100%' }}>
      <StyledCard bgImage={items} position={determinedPosition} {...handlers}>
        <FlexRowSpace>
          <UserInfoWrapper>
            <Avatar user={user} width="24px" height="24px" />
            <Username href={`/u/${user.username}`}>
              <StyledUsernameAnchor>{user.username}</StyledUsernameAnchor>
            </Username>
          </UserInfoWrapper>
          {session && <div>
            <EllipseMenuIconWrapper onClick={handleEllipsisMenuOpen}>
              <EllipseMenuIcon />
            </EllipseMenuIconWrapper>
          </div>}
        </FlexRowSpace>
        <Title
          href={{
            pathname: `/totym/${user.username}/${generatedSlug}/${id}`,
          }}
        >
          <StyledTitleAnchor>{title}</StyledTitleAnchor>
        </Title>
        <StyledItemName>{items[determinedPosition].name}</StyledItemName>
        <ButtonWrapper>
          <StyledBookMark
            onClick={() => handleBookMark()}
            isMyBookmark={isMyBookMark}
          >
            <BookMarkIcon width="24" height="24" />
            <StyledLabel>{bookMarks?.length}</StyledLabel>
          </StyledBookMark>
          <StyledComment
            onClick={() => {
              router.push(
                `/totym/${user.username}/${generatedSlug}/${id}#comments`
              );
            }}
          >
            <CommentIcon width="20" height="20" />
            <StyledLabel>{commentCount}</StyledLabel>
          </StyledComment>
        </ButtonWrapper>
      </StyledCard>
      {shouldShowCarousel && (
        <CarouselWrapper>
          <CarouselSlotWrapper>
            {items.map((item, i) => {
              const isCurrent = item.id === items[determinedPosition].id;
              return (
                <CarouselSlot
                  isCurrent={isCurrent}
                  numItemsToDisplay={'4'}
                  onClick={() => jumpToSlide(i)}
                  zIndex={i}
                  key={i}
                >
                  <Item img={item.image} imgHeight={'70px'} />
                </CarouselSlot>
              );
            })}
          </CarouselSlotWrapper>
        </CarouselWrapper>
      )}
      <AdditionalInfo>
        <FlexRowSpace>
          <ActionItemsWrapper>
            <ItemMiniName>{items[determinedPosition].name}</ItemMiniName>
            <Description onClick={() => setIsExpand(!isExpand)}>
              {items[determinedPosition].description &&
                truncateString(
                  items[determinedPosition].description,
                  50,
                  isExpand
                )}
            </Description>
          </ActionItemsWrapper>
        </FlexRowSpace>
        <SavedByContainer>
          <AvatarSection>
            {bookMarks &&
              bookMarks
                .slice(0, 5)
                .map((user, i) => <Avatar user={user.user} zInd={i} key={i} />)}
          </AvatarSection>
          <UpdatedText>
            {bookMarks && bookMarks.length > 0 ? <span>Saved by</span> : <></>}
            {bookMarks &&
              bookMarks.slice(0, 2).map((item, index) => (
                <span key={index}>
                  {' '}
                  {item.user.name}{' '}
                  {`${bookMarks.length == 1 ? '' : index == 0 ? 'and' : ''}`}
                </span>
              ))}
            {bookMarks && bookMarks.length > 2 ? (
              <span>and {bookMarks.length - 2} others </span>
            ) : (
              <></>
            )}
          </UpdatedText>
        </SavedByContainer>
      </AdditionalInfo>
      <EllipsesMenu
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        ellipsesType={ellipsesType}
        handleShareModal={handleModalOpen}
        selectedTitle={title}
        totym={totym}
      />
      <ShareModal
        isOpen={showModal}
        fullSharableUrl={fullSharableUrl}
        handleModalClose={handleModalClose}
        totym={totym}
        user={user}
      />
    </div>
  );
}
