import Image from 'next/image';
import styled from 'styled-components';
import TotymIcon from '../svgs/TotymIcon';
import cards from './images/cards.png';

const StyledSection = styled.section`
  align-items: center;
  background: #fff;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  margin: 3rem auto;
  max-width: 1200px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    flex-direction: row;
  }
`;
const ContentSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  padding: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    min-height: 480px;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    min-height: 580px;
  }
`;
const ImageSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  width: 100%;
`;
const StyledImage = styled(Image)`
  width: 75%;
`;
const StyledLogo = styled.div`
  background: ${({ theme }) => theme.colors.gray.base100};
  border-radius: 50%;
  box-shadow: ${({ theme }) => theme.shadow.button.small};
  display: flex;
  padding: 0.5rem;

  svg {
    height: 100px;
    width: 100px;

    ${({ theme }) => theme.breakpoints.up('md')} {
      height: 150px;
      width: 150px;
    }
  }
`;
const Description = styled.p`
  color: rgb(88, 88, 90);
  font-size: 1.25rem;
  line-height: 1.571;
  margin: 1rem auto;
  padding: 0.5rem;
  text-align: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.75rem;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 2rem;
    padding: 1.25rem;
  }
`;

export default function LandingPageWhat() {
  return (
    <StyledSection>
      <ImageSection>
        <StyledImage alt="Example of Totym cards" src={cards} />
      </ImageSection>
      <ContentSection>
        <StyledLogo>
          <TotymIcon />
        </StyledLogo>
        <Description>
          Totyms are digital exchange cards that hold ideas and recommendations.
          They can be created, shared, or requested within your network.
        </Description>
      </ContentSection>
    </StyledSection>
  );
}
