import { InferGetServerSidePropsType } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { initializeApollo } from '../apollo/client';
import { useSession, getSession } from 'next-auth/client';
import { GET_ALL_TOTYMS } from '../graphql/queries';
import Seo from '../components/Seo';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import { appUrl, siteInfo } from '../utils/config';
import { Button } from '@material-ui/core';

const Feed = dynamic(() => import('../components/Feed'));
const LandingPage = dynamic(() => import('../components/LandingPage'));

//Todo: Caching needs to be fixed here
export async function getServerSideProps(context) {
  const session = await getSession(context);
  
  if (session) {
    if (!session?.user.username || !session?.user.name) {
      context.res.statusCode = 302;
      context.res.setHeader('Location', '/auth/new-user');
      context.res.end();
    }
  }
  const apolloClient = initializeApollo();

  const { data } = await apolloClient.query({
    query: GET_ALL_TOTYMS,
  });

  return {
    props: {
      data,
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

export default function Home({
      data: { totyms },
    }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [session, loading] = useSession();

  if (!totyms || loading) return <Loader />;

  return (
    <>
      <Seo
        author=""
        description={siteInfo.description}
        title={siteInfo.title}
        image={siteInfo.image}
        url={appUrl}
      />

      {!session ? (
        <LandingPage />
      ) : totyms && totyms.length > 0 ? (
        <Layout>
          <Feed totyms={totyms} />
        </Layout>
      ) : (
        <Layout>
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              height: '20vh',
              justifyContent: 'center',
              padding: '0 1rem',
            }}
          >
            <Link href="/create" passHref>
              <Button variant="contained" color="secondary">
                Create a Totym
              </Button>
            </Link>
          </div>
        </Layout>
      )}
    </>
  );
}
