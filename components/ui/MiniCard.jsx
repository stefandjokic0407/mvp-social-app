import React from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useCarousel } from '../../hooks/useCarousel';

dayjs.extend(relativeTime);

const StyledCard = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const TotymImageSection = styled.div`
  background-blend-mode: overlay;
  background-image: url(${({ bgImage, position }) => bgImage[position].image}),
    linear-gradient(rgba(0, 0, 0, 0.21), rgba(0, 0, 0, 0.21));
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 3px;
  box-shadow: 0px 5px 5px rgba(10, 10, 10, 0.2);
  min-height: 5rem;
  padding: 0;
  position: relative;
  width: 5rem;

  &:hover {
    box-shadow: 0px 8px 8px rgba(10, 10, 10, 0.3);
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 6.25rem;
    min-height: 6.875rem;
  }
`;

const CarouselWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  width: 5rem;
  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 6.25rem;
  }
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
      isCurrent ? '#ffbc49, #ca330f' : '#fff, #fff'
    }) border-box`};
  border-radius: 5px;
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
const TotymInfoSection = styled.div`
  display: block;
  padding-left: 0.75rem;
`;
const TotymTitle = styled.p`
  font-style: normal;
  font-weight: 600;
  font-size: ${({ isMore }) => (isMore ? '0.875rem' : '0.75rem')};
  line-height: 1rem;
  letter-spacing: -0.05px;
  color: ${({ theme }) => theme.colors.gray.base900};
  padding: ${({ isMore }) => (isMore ? '0.5rem 0' : '0.25rem 0')};
  ${({ theme }) => theme.breakpoints.up('md')} {
    padding-top: 1.5rem;
    font-size: 1.25rem;
    display: flex;
  };
`;
export default function MinCard({
  totym: { id, title, description, items, user, updatedAt },
  isMore,
  type = "modal",
}) {
  const {
    carouselState: { position, shouldSlide, direction },
    handlers,
    getOrder,
    jumpToSlide,
  } = useCarousel({ elements: items });

  return (
    <StyledCard>
      <div>
        <TotymImageSection bgImage={items} position={position} {...handlers} />
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
                  <Item img={item.image} imgHeight={'1rem'} />
                </CarouselSlot>
              );
            })}
          </CarouselSlotWrapper>
        </CarouselWrapper>
      </div>
      {
        type !== "notification"? (
          <TotymInfoSection>
            <TotymTitle isMore={isMore}>{title}</TotymTitle>
            <TotymTitle isMore={isMore}>{user.username}</TotymTitle>
          </TotymInfoSection>
        ) : (
          <></>
        )
      }
    </StyledCard>
  );
}