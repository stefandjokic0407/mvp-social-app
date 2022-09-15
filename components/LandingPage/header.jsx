import styled from 'styled-components';
import TotymIconNameTagline from '../svgs/TotymIconNameTagline';

const StyledHeader = styled.header`
  align-items: center;
  background-color: #fff;
  box-shadow: z0px 2px 2px 0px rgba(0, 0, 0, 0.11);
  display: flex;
  justify-content: center;
  height: 100px;
  width: 100%;
`;

export default function LandingPageHeader() {
  return (
    <StyledHeader>
      <TotymIconNameTagline namecolor="#0f0f0f" />
    </StyledHeader>
  );
}
