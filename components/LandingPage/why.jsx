import Image from 'next/image';
import styled from 'styled-components';
import TotymIcon from '../svgs/TotymIcon';
import circlechart from './images/circlechart.png';

const StyledSection = styled.section`
  align-items: center;
  background: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5rem auto 0;
  padding: 2rem 1rem;
  width: 100%;
`;
const ImageSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem auto;
  padding: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 75%;
  }
`;
const StyledImage = styled(Image)`
  width: 100%;
`;
const Title = styled.h2`
  color: rgb(250, 168, 45);
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 0.5rem auto;
  padding: 0.5rem 2rem;
  text-align: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 6rem;
  }
`;

const Description = styled.p`
  color: rgb(88, 88, 90);
  font-family: 'Roboto';
  font-size: 1.25rem;
  line-height: 1.429;
  text-align: center;
  width: 90%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.75rem;
    width: 85%;
  }

  ${({ theme }) => theme.breakpoints.up('lg')} {
    font-size: 2rem;
    padding: 1.25rem;
  }
`;

export default function LandingPageWhy() {
  return (
    <StyledSection>
      <Title>Why Totym?</Title>
      <Description>
        We want to cut through the mess of faceless, aggregated reviews. The
        best information comes from the people we know and trust.
      </Description>
      <ImageSection>
        <StyledImage src={circlechart} alt="why Totym infographic" />
      </ImageSection>
    </StyledSection>
  );
}
