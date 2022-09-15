import React, { useState } from 'react';
import styled, { useTheme } from 'styled-components';
import Link from 'next/link';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCarousel } from '../../hooks/useCarousel';
import BookMarkIcon from '../svgs/BookMarkIcon';
import Avatar from './Avatar';
import EllipseMenuIcon from '../svgs/EllipseMenuIcon';
import { useSession } from 'next-auth/client';
import EllipsesMenu from './EllipsesMenu';
import { appUrl } from '../../utils/config';
import { slugify } from '../../utils';
import ShareModal from './ShareModal';

dayjs.extend(relativeTime);

const StyledCard = styled.div`
  align-items: center;
  aspect-ratio: 7 / 8;
  background-blend-mode: overlay;
  background-image: url(${({ bgImage, position }) => bgImage[position].image}),
    linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: flex-start;
  padding: 0;
  position: relative;
  width: 100%;

  /** Fallback for non aspect-ratio supported browsers */
  @supports not (aspect-ratio: 7 / 8) {
    min-height: 400px;
  }
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
  border: 3px solid transparent;
  border-radius: 0 0 5px 5px;
  cursor: pointer;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
  margin-left: -10%;
  min-width: 32.5%;
  width: 100%;
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
const TotymInfoSection = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  text-align: center;
  width: 100%;
`;
const StyledAnchorTag = styled.a`
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  padding: 0 10px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    color: ${({ theme }) => theme.colors.primary.main};
  }
`;
const TotymTitle = styled.p`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fontFamily.heading};
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 600;
  line-height: 1.25em;
  padding: 10px;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: all 0.2s ease-in-out;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.25rem;
  }

  &:hover {
    color: ${({ theme }) => theme.colors.primary.light};
  }
`;
const SavedCount = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-size: 1.25rem;
  font-weight: 600;
  margin-left: 0.75rem;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &:hover {
    color: ${({ theme, type }) =>
      type == 'saved' ? theme.colors.primary.light : 'white'};
  }
`;
const EllipseMenuIconWrapper = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  padding: 10px;
  position: absolute;
  right: 5px;
  top: 0px;
  width: 50px;
  z-index: 100;
`;
const LinksWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

export default function ProfileFeedCard({
  totym,
  totym: { id, title, items, user, collection },
  type = 'published',
}) {
  const {
    carouselState: { position },
    handlers,
    jumpToSlide,
  } = useCarousel({ elements: items });
  const [session, loading] = useSession();
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const [ellipsesType, setEllipsesType] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const generatedSlug = slugify(title);
  const fullSharableUrl = `${appUrl}/totym/${user.username}/${generatedSlug}/${id}`;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <StyledCard bgImage={items} position={position} {...handlers}>
        <EllipseMenuIconWrapper
          onMouseDown={(e) => e.stopPropagation()}
          onClick={handleEllipsisMenuOpen}
        >
          <EllipseMenuIcon />
        </EllipseMenuIconWrapper>

        <LinksWrapper>
          <Link
            href={`/totym/${totym.user.username}/${slugify(totym.title)}/${
              totym.id
            }`}
            passHref
          >
            <a>
              <TotymTitle type={type}>{title}</TotymTitle>
            </a>
          </Link>
          <TotymInfoSection type={type}>
            {type == 'saved' ? (
              <Link href={`/u/${totym.user.username}`} passHref>
                <StyledAnchorTag>
                  <Avatar
                    user={user}
                    width={`${isMobile ? '32' : '45'}`}
                    height={`${isMobile ? '32' : '45'}`}
                  />
                  <SavedCount type={type}>
                    {type == 'saved' ? user.username : collection.length}
                  </SavedCount>
                </StyledAnchorTag>
              </Link>
            ) : (
              <>
                <BookMarkIcon
                  width={`${isMobile ? '24' : '32'}`}
                  height={`${isMobile ? '24' : '32'}`}
                />
                <SavedCount type={type}>
                  {type == 'saved' ? user.name : collection.length}
                </SavedCount>
              </>
            )}
          </TotymInfoSection>
        </LinksWrapper>
      </StyledCard>
      <CarouselWrapper>
        <CarouselSlotWrapper>
          {items.map((item, i) => {
            const isCurrent = item.id === items[position].id;
            return (
              <CarouselSlot
                isCurrent={isCurrent}
                numItemsToDisplay={'4'}
                onClick={() => jumpToSlide(i)}
                zIndex={i}
                key={i}
              >
                <Item img={item.image} imgHeight={'3rem'} />
              </CarouselSlot>
            );
          })}
        </CarouselSlotWrapper>
      </CarouselWrapper>
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
