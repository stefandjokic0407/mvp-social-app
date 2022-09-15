import { useEffect } from 'react';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';
import { useLazyQuery } from '@apollo/client';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Seo from '../components/Seo';
import NotificationCard from '../components/ui/NotificationCard';
import { appUrl, siteInfo } from '../utils/config';
import { initializeApollo } from '../apollo/client';
import { GET_NOTIFICATIONS, GET_USER_BY_EMAIL } from '../graphql/queries';

const PageTitle = styled.h1`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  text-align: center;

  ${({ theme }) => theme.breakpoints.up('md')} {
    font-size: 1.5rem;
    text-align: left;
  }
`;
const NoticationsContainer = styled.div`
  margin-bottom: 3rem;
  overflow: auto;
`;

export default function NotificationsPage(props) {
  const apolloClient = initializeApollo();
  const [session, loading] = useSession();

  const [getUser, { data, loading: userLoading, error, refetch }] =
    useLazyQuery(GET_NOTIFICATIONS, { fetchPolicy: 'network-only' }); // Doesn't check cache before making a network request

  useEffect(() => {
    async function fetchData() {
      const { data: userData } = await apolloClient.query({
        query: GET_USER_BY_EMAIL,
        variables: { email: session?.user?.email },
      });

      if (userData)
        getUser({ variables: { userId: { equals: userData.user.id } } });
    }

    if (session) fetchData();
  }, [session]);

  if (loading || userLoading || data == undefined) {
    return <Loader />;
  }

  const { requestAndSharedUsers: notifications } = data;
  return (
    <>
      <Seo
        author=""
        description=""
        title="Notifications"
        image={siteInfo.image}
        url={`${appUrl}/notifications`}
      />
      <Layout>
        {session ? (
          <>
            <PageTitle>Notifications</PageTitle>
            <NoticationsContainer>
              {notifications &&
                notifications.map((notification) => (
                  <NotificationCard
                    key={notification.id}
                    data={notification}
                    handleRefetch={refetch}
                  />
                ))}
            </NoticationsContainer>
          </>
        ) : (
          <h1>Please Sign In</h1>
        )}
      </Layout>
    </>
  );
}
