import React from 'react';
import styled from 'styled-components';

const StyledInputSection = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  align-items: flex-start;
  flex-direction: column;
`;

const StyledInput = styled.input`
  background: ${({ theme }) => `${theme.colors.white}`};
  border-radius: 0.313rem;
  border: 1px solid ${({ theme }) => `${theme.colors.border.gray002}`};
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-size: 1.125rem;
  padding: 0.625rem 0.75rem;
  width: 100%;
  outline: none;
  margin-left: 0;
  margin-top: 1rem;
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => `${theme.colors.gray.base900}`};
  font-weight: normal;
  font-size: 1rem;
  line-height: 1rem;
  margin: 1rem 0 0;
  text-transform: capitalize;
`;

const StyledValidValue = styled.small`
  color: red;
  display: ${({ isValid }) => (isValid ? 'none' : 'flex')};
  position: absolute;
  bottom: -1.25rem;
  right: 0;
`;

const StyledLoad = styled(StyledValidValue)`
  display: ${({ isLoad }) => (isLoad ? 'flex' : 'none')};
`;

export default function InputCard({
  label,
  value,
  isValid = true,
  isLoad = false,
  handleUpdate,
  handleCheckUsername = () => {
    return false;
  },
}) {
  return (
    <StyledInputSection>
      <StyledLabel>{label}:</StyledLabel>
      <StyledInput
        value={value}
        onChange={(e) => handleUpdate(label, e.target.value)}
        onBlur={(e) => handleCheckUsername(e.target.value)}
      />
      <StyledValidValue isValid={isValid}>
        That username is taken. Try another
      </StyledValidValue>
      <StyledLoad isLoad={isLoad}>Checking...</StyledLoad>
    </StyledInputSection>
  );
}
