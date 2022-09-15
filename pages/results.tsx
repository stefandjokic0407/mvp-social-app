import React from 'react';
import { useSession } from 'next-auth/client';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Feed from '../components/Feed';
import LandingPage from '../components/LandingPage';
import { appUrl, siteInfo } from '../utils/config';
import { withRouter, useRouter } from 'next/router';
import { SEARCH_TOTYM } from '../graphql/queries';
import { useQuery } from '@apollo/client';

function ResultsPage() {
  const router = useRouter();
  const [session, loading] = useSession();
  const { result } = router.query;

  const { data, loading: queryLoading } = useQuery(SEARCH_TOTYM, {
    variables: {
      search: result,
    },
    fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  });

  if (loading || queryLoading) return <Loader />;

  return (
    <>
      <Seo
        author=""
        description={siteInfo.description}
        title={siteInfo.title}
        image={siteInfo.image}
        url={appUrl}
      />

      {session ? (
        !queryLoading && data.totyms.length == 0 ? (
          <Layout>
            <p>Oops, no totyms found!</p>
          </Layout>
        ) : (
          <Layout>
            <Feed totyms={data.totyms} />
          </Layout>
        )
      ) : (
        <LandingPage />
      )}
    </>
  );
}

export default withRouter(ResultsPage);
