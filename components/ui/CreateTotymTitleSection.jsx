import React from 'react';
import styled, { useTheme } from 'styled-components';
import { useMediaQuery } from '@material-ui/core';
import Avatar from './Avatar';

const StyledSection = styled.div`
  box-sizing: border-box;
  border-radius: 0.25rem;
  display: flex;
  margin: 0;
  padding: 0.313rem 0;
  width: 100%;
`;

const StyledTotymTitle = styled.input`
  background: transparent;
  border: 0;
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.border.gray002}`};
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-size: 1.25rem;
  font-style: normal;
  font-weight: normal;
  line-height: 1.75rem;
  margin-left: 0.875rem;
  outline: none;
  width: 100%;
`;

export default function CreateTotymTitleSection({
  user,
  totymTitle,
  handleTitleEvent,
}) {
  const { breakpoints } = useTheme();
  const isMobile = useMediaQuery(breakpoints.down('md'));

  return (
    <StyledSection>
      <Avatar
        user={user}
        width={`${isMobile ? '45px' : '70px'}`}
        height={`${isMobile ? '45px' : '70px'}`}
      />
      <StyledTotymTitle
        placeholder="Totym title*"
        value={totymTitle}
        onChange={handleTitleEvent}
      />
    </StyledSection>
  );
}
