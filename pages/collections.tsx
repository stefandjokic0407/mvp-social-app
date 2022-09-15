import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/client';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import { initializeApollo } from '../apollo/client';
import Layout from '../components/Layout';
import Loader from '../components/Loader';
import Seo from '../components/Seo';
import { GET_USER_BY_EMAIL } from '../graphql/queries';
import { appUrl, siteInfo } from '../utils/config';

const ProfileFeedCard = dynamic(
  () => import('../components/ui/ProfileFeedCard')
);

const MainContainer = styled.div`
  margin: 0 auto 1rem;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin: 1rem auto;
  }
`;
const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 500;
  margin-bottom: 1rem;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 10px;
  margin-top: 20px;
`;
const SearchContainer = styled.div`
  align-items: center;
  display: flex;
  height: 50px;
  justify-content: start;
  margin-bottom: 1rem;
  width: 100%;
`;
const StyledSearchIcon = styled(SearchIcon)`
  display: none;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    color: ${({ theme }) => theme.colors.primary.main};
    display: block;
    width: 50px;
  }
`;
const InputContainer = styled.input`
  background: none;
  border-radius: 5px;
  color: #5c5c5c;
  line-height: 32px;
  padding: 10px;
  width: 100%;

  ${({ theme }) => theme.breakpoints.up('sm')} {
    margin-left: -50px;
    padding: 10px 10px 10px 40px;
  }
`;

export default function CollectionsPage(props) {
  const apolloClient = initializeApollo();
  const [session, loading] = useSession();
  const [user, setUser] = useState(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    async function fetchData() {
      const { data: userData } = await apolloClient.query({
        query: GET_USER_BY_EMAIL,
        variables: { email: session?.user?.email },
      });

      if (userData) {
        setUser(userData.user);
      }
    }

    if (session) fetchData();
  }, [session]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Seo
        author=""
        description=""
        title="Totym Collections"
        image={siteInfo.image}
        url={`${appUrl}/collections`}
      />
      <Layout>
        {session ? (
          <MainContainer>
            <Title>Collections</Title>
            <SearchContainer>
              <StyledSearchIcon />
              <InputContainer
                type="search"
                placeholder="Search Collections by title"
                value={searchText}
                onChange={({ target: { value } }) => setSearchText(value)}
              />
            </SearchContainer>
            <Grid>
              {user &&
                user.collections &&
                user.collections
                  .filter((collection) =>
                    collection.totym.title
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((collection, index) => (
                    <ProfileFeedCard
                      totym={collection.totym}
                      key={index}
                      type="saved"
                    />
                  ))}
            </Grid>
          </MainContainer>
        ) : (
          <h1>Please Sign In</h1>
        )}
      </Layout>
    </>
  );
}
