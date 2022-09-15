import { Button } from '@material-ui/core';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styled, { useTheme } from 'styled-components';
import TotymIcon from '../svgs/TotymIcon';
import buildYourFirstTotym from './images/build-your-first-totym.png';
import requestTotym from './images/request-a-totym.png';
import writeIcon from './images/write-icon.png';
import saveIcon from './images/save-star-icon.png';

const StyledSection = styled.section`
  align-items: center;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem auto 0;
  padding: 2rem 1rem;
  width: 100%;
`;
const ImageSection = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  width: 100%;
`;
const StyledImage = styled.img`
  width: 75%;
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
  color: ${({ theme }) => theme.colors.gray.base500};
  font-size: 1.5rem;
  margin: 2rem auto 0;
  padding: 0.5rem;
  text-align: center;
  width: 75%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.75rem;
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
  margin: 2rem auto 0;
  width: 75%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    font-size: 3rem;
    height: 100px;
    width: 398px;
  }
`;
const Flex = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin: 1rem auto;
  max-width: 1200px;
  width: 90%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    flex-direction: row;
    width: 100%;
  }
`;

const SubTitle = styled.h3`
  color: rgb(250, 168, 45);
  font-size: 1.25rem;
  font-weight: bold;
  line-height: 0.857;
  line-height: 1.2;
  margin: 0.5rem auto;
  min-height: 50px;
  text-align: center;
  text-transform: uppercase;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 2rem;
  }
`;
const ImageWrapper = styled.div`
  margin-bottom: 2rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('md')} {
    margin: 0 auto 2rem;
    width: 90%;
  }
  ${({ theme }) => theme.breakpoints.up('lg')} {
    margin: 0 auto 2rem;
    width: 80%;
  }
`;
const BuildWrapper = styled.div`
  width: 100%;
`;
const RequestWrapper = styled.div`
  width: 100%;
`;
const IconWrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  width: 100%;
`;
const IconImageWrapper = styled.div`
  height: 70px;
  width: 70px;
`;
const IconDescription = styled.div`
  color: rgb(88, 88, 90);
  font-size: 1.25rem;
  line-height: 1.2;
  text-align: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.5rem;
  }
`;
const Divider = styled.div`
  border-bottom: 1px solid rgb(250, 168, 45);
  margin-top: 1rem;
  width: 30%;
`;

const desktopSection = () => (
  <>
    <Flex>
      <BuildWrapper>
        <SubTitle>Build Your First Totym</SubTitle>
        <ImageWrapper>
          <Image
            src={buildYourFirstTotym}
            layout="responsive"
            alt="build a totym"
            width={365}
            height={730}
          />
        </ImageWrapper>
      </BuildWrapper>
      <RequestWrapper>
        <SubTitle>Request A Totym</SubTitle>
        <ImageWrapper>
          <Image
            src={requestTotym}
            layout="responsive"
            alt="request a totym"
            width={365}
            height={730}
          />
        </ImageWrapper>
      </RequestWrapper>
    </Flex>
    <Flex>
      <IconWrapper>
        <IconImageWrapper>
          <Image
            src={writeIcon}
            layout="responsive"
            alt="write icon"
            width={100}
            height={100}
          />
        </IconImageWrapper>
        <IconDescription>
          Edit your Totym’s whenever changes happen!
        </IconDescription>
      </IconWrapper>
      <IconWrapper>
        <IconImageWrapper>
          <Image
            src={saveIcon}
            layout="responsive"
            alt="save icon"
            width={100}
            height={100}
          />
        </IconImageWrapper>
        <IconDescription>
          Save the best Totym’s to easily find again!
        </IconDescription>
      </IconWrapper>
    </Flex>
  </>
);

const mobileSection = () => (
  <>
    <Flex>
      <BuildWrapper>
        <SubTitle>Build Your First Totym</SubTitle>
        <ImageWrapper>
          <Image
            src={buildYourFirstTotym}
            layout="responsive"
            alt="build a totym"
            width={365}
            height={730}
          />
        </ImageWrapper>
      </BuildWrapper>
      <IconWrapper>
        <IconImageWrapper>
          <Image
            src={writeIcon}
            layout="responsive"
            alt="write icon"
            width={100}
            height={100}
          />
        </IconImageWrapper>
        <IconDescription>
          Edit your Totym’s whenever changes happen!
        </IconDescription>
      </IconWrapper>
    </Flex>
    <Flex>
      <RequestWrapper>
        <SubTitle>Request A Totym</SubTitle>
        <ImageWrapper>
          <Image
            src={requestTotym}
            layout="responsive"
            alt="request a totym"
            width={365}
            height={730}
          />
        </ImageWrapper>
      </RequestWrapper>
      <IconWrapper>
        <IconImageWrapper>
          <Image
            src={saveIcon}
            layout="responsive"
            alt="save icon"
            width={100}
            height={100}
          />
        </IconImageWrapper>
        <IconDescription>
          Save the best Totym’s to easily find again!
        </IconDescription>
      </IconWrapper>
    </Flex>
  </>
);

export default function LandingPageGetStarted() {
  const router = useRouter();
  const { breakpoints } = useTheme();
  const notMobile = useMediaQuery(breakpoints.up('sm'));
  return (
    <StyledSection>
      <Title>Join Totym</Title>
      <Divider />
      <StyledButton
        variant="contained"
        color="primary"
        onClick={() => router.push('/api/auth/signin')}
      >
        Sign Up
      </StyledButton>
      <Description>Start exploring, or...</Description>
      {notMobile ? desktopSection() : mobileSection()}
    </StyledSection>
  );
}
