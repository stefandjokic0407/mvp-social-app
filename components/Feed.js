import React from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const FullImageMainCard = dynamic(() => import('./ui/FullImageMainCard'));

dayjs.extend(relativeTime);

const CardWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  margin: 0 auto 6rem;
  width: 100%;
`;

export default function Feed({ totyms }) {
  return (
    <CardWrapper>
      {totyms &&
        totyms.map((totym) => (
          <FullImageMainCard key={totym.id} totym={totym} />
        ))}
    </CardWrapper>
  );
}
