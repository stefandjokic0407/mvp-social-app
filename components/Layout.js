import styled, { useTheme } from 'styled-components';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useQuery, useSubscription } from '@apollo/client';
import { NOTIFICATIONS_COUNT } from '../graphql/queries';
import { useMemo, useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Loader from '../components/Loader';
import { useSession } from 'next-auth/client';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr;
  justify-content: space-between;
  margin: 0 auto;
  max-width: ${({ theme }) => `${theme.breakpoints.values.xxl}px`};
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    grid-template-columns: 1fr 7fr;
  }
`;

const Wrapper = styled.div`
  padding: 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('lg')} {
    margin: 0 0 0 218px; /* 218px is the width of the sidebar + 0.5rem */
    padding: 1rem 0 1rem 2rem;
    width: calc(
      97vw - 234px
    ); /* 234px is the width of the sidebar + padding of 1rem */
    max-width: calc(1440px - 300px);
  }
`;

export default function Layout({ children }) {
  const { breakpoints } = useTheme();
  const [session, loading] = useSession();
  const [notifications, setNotifications] = useState(0);

  const { data: counts, refetch } = useQuery(NOTIFICATIONS_COUNT, {
    variables: {
      userId: {
        equals: session?.user?.id !== undefined ? session?.user?.id : 0,
      },
      read: { equals: false },
    },
    pollInterval: 60000,
  });

  useMemo(() => {
    if (
      counts &&
      counts?.aggregateRequestAndSharedUser?._count?.id != notifications
    ) {
      if (
        notifications != 0 &&
        counts?.aggregateRequestAndSharedUser?._count?.id > notifications
      ) {
        toast.success('New Notification', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
        });
      }
      setNotifications(counts?.aggregateRequestAndSharedUser?._count?.id);
    }
  }, [counts]);

  const isMobile = useMediaQuery(breakpoints.down('md'));

  // if (loading) return <Loader />;
  return (
    <>
      <Header />
      <MainWrapper>
        {!isMobile && <Sidebar notifications={notifications} />}
        <Wrapper>{children}</Wrapper>
      </MainWrapper>
      {isMobile && <Sidebar notifications={notifications} />}
    </>
  );
}
