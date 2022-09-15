import Link from 'next/link';
import styled from 'styled-components';
import TotymIconNameTagline from '../svgs/TotymIconNameTagline';

const StyledFooter = styled.footer`
  align-items: center;
  background-color: #2c0b02;
  display: flex;
  height: 400px;
  justify-content: center;
  position: relative;
  width: 100%;

  svg {
    margin: -2rem auto 2rem;
    width: 250px;

    ${({ theme }) => theme.breakpoints.up('sm')} {
      height: 150px;
      width: 500px;
    }
  }
`;
const Copyright = styled.div`
  bottom: 100px;
  color: #fff;
  font-size: 0.75rem;
  position: absolute;

  a {
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LandingPageFooter() {
  const year = new Date().getFullYear();

  return (
    <StyledFooter>
      <TotymIconNameTagline namecolor="#fff" taglinecolor="#fff" />
      <Copyright>
        &copy; {year} Totym |{' '}
        <Link href="/terms-of-use" passHref>
          <a target="_blank" rel="noreferrer">
            Terms and Conditions
          </a>
        </Link>
      </Copyright>
    </StyledFooter>
  );
}
