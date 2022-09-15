import styled from 'styled-components';
import { useRouter } from 'next/router';
import SearchIcon from '@material-ui/icons/Search';
import Image from 'next/image';
import introDropdown from './images/introdropdown.png';
import { Button } from '@material-ui/core';
import cubeTransparent from './images/hero-cube-background-transparent.png';

const StyledSection = styled.section`
  align-items: center;
  background-color: rgb(233, 233, 233);
  background-image: url(${cubeTransparent});
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem 1rem 5rem;
  width: 100%;
`;
const FullSizeOverlay = styled.div`
  background-image: url(${cubeTransparent});
  height: 100%;
  width: 100%;
`;

const Title = styled.h1`
  color: rgb(250, 168, 45);
  font-size: 3.5rem;
  font-weight: bold;
  line-height: 1.2;
  margin: 0.5rem auto;
  padding: 0.5rem 2rem;
  text-align: center;

  span {
    color: ${({ theme }) => theme.colors.gray.base600};
    display: block;
    font-size: 1.25rem;
    font-weight: 100;
    padding: 1rem 0;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 6rem;
  }
`;

const SearchBoxWrapper = styled.div`
  background: #fff;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.feature.small.default};
  color: #3b3b3b;
  margin: 0 1rem 3rem;
  padding: 0.25rem;
`;

const SearchItem = styled.div`
  align-items: center;
  display: flex;
  font-size: 1.2rem;
  justify-content: flex-start;
  margin: 0 0.5rem;
  padding: 1rem 1rem 1rem 0;

  &:first-of-type {
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  svg {
    height: 1.2rem;
    margin-right: 0.5rem;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 80%;
  }

  ${({ theme }) => theme.breakpoints.up('md')} {
    width: 60%;
  }
`;
const StyledButton = styled(Button)`
  background-color: rgb(250, 168, 45);
  border-radius: 45px;
  box-shadow: 0px 3px 2.85px 0.15px rgba(0, 0, 0, 0.31),
    inset 0.14px 1.995px 4px 0px rgba(0, 0, 0, 0.24);
  color: white;
  font-size: 1.5rem;
  height: 70px;
  margin: 3rem auto 0;
  width: 75%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 3rem;
    height: 100px;
    width: 398px;
  }
`;

export default function LandingPageHero() {
  const router = useRouter();
  return (
    <StyledSection>
      <Title>
        Welcome to Totym
        <span>Ever wonder...</span>
      </Title>
      <ImageWrapper>
        <Image
          src={introDropdown}
          layout="responsive"
          alt="circle chart"
          width={865}
          height={430}
        />
      </ImageWrapper>
    </StyledSection>
  );
}
