import { useSession } from 'next-auth/client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { appUrl, siteInfo } from '../utils/config';
import { GET_TOTYM } from '../graphql/queries';
import { initializeApollo } from '../apollo/client';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Seo from '../components/Seo';
import CreateTotym from '../components/CreateTotym';

export default function CreatePage(props) {
  const router = useRouter();
  const apolloClient = initializeApollo();
  const [session, loading] = useSession();
  const { title, totymId } = router.query;

  const [currentId, setCurrentId] = useState(0);
  const [items, setItems] = useState([]);
  const [totymTitle, setTotymTitle] = useState('');

  useEffect(() => {
    if (title) setTotymTitle(title as string);
    else setTotymTitle('');
  }, [title]);

  useEffect(() => {
    if (totymId) setCurrentId(parseInt(totymId as string));
    else setCurrentId(0);
  }, [totymId]);

  useEffect(() => {
    async function fetchTotym() {
      const { data: totym } = await apolloClient.query({
        query: GET_TOTYM,
        variables: { id: currentId },
      });
      setItems(
        totym.totym.items.map((item) => {
          const tempItem: any = Object.assign({}, item);
          tempItem.isOpen = false;
          tempItem.currentElement = 'name';
          return tempItem;
        })
      );
    }
    if (currentId != 0) fetchTotym();
    else setItems([]);
  }, [currentId]);

  if (loading) {
    return <Loader />;
  }
  return (
    <>
      <Seo
        author=""
        description=""
        title="Create a Totym"
        image={siteInfo.image}
        url={`${appUrl}/create`}
      />
      <Layout>
        {session ? (
          <CreateTotym
            items={items}
            setItems={setItems}
            totymTitle={totymTitle}
            user={session.user}
            currentId={currentId}
            setCurrentId={setCurrentId}
            setTotymTitle={setTotymTitle}
          />
        ) : (
          <h1>Please Sign In</h1>
        )}
      </Layout>
    </>
  );
}
