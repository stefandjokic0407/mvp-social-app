import React from 'react';
import styled from 'styled-components';

export const DEFAULT_AVATAR =
  'https://res.cloudinary.com/di9t1lu8j/image/upload/v1613784258/logos/avatar-default_jvjxyn.png';

const StyledAvatar = styled.img`
  border: 1px solid ${({ theme }) => theme.colors.white};
  border-radius: 50%;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  margin-left: -10px;
  object-fit: cover;
  z-index: ${({ zInd }) => 5 - zInd};
  ${({ zInd }) =>
    zInd === 0 &&
    `
    margin-left: 0;
  `}
`;

export default function Avatar({
  user,
  width = '25px',
  height = '25px',
  zInd = 0,
}) {
  return (
    <StyledAvatar
      src={user.image || DEFAULT_AVATAR}
      alt={user.username}
      width={width}
      height={height}
      zInd={zInd}
    />
  );
}
