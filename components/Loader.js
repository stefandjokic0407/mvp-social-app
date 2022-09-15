import React from 'react';
import styled, { keyframes } from 'styled-components';
import LoopIcon from '@material-ui/icons/Loop';
import { useSession } from 'next-auth/client';
import Layout from '../components/Layout';

const rotateABD = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(-360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
  svg {
    fill: ${(props) =>
      props.theme.colors ? props.theme.colors.primary.main : '#F9A81C'};
    width: 64px;
    height: 64px;
    opacity: 0.8;
    transform: translateX(-50%) translateY(-50%);
    animation: ${rotateABD} 2s linear infinite;
  }
`;

export default function Loader() {
  const [session, loading] = useSession();

  return session ? (
    <Layout>
      <Wrapper>
        <LoopIcon />
      </Wrapper>
    </Layout>
  ) : (
    <Wrapper>
      <LoopIcon />
    </Wrapper>
  );
}
