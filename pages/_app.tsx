import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { useApollo } from '../apollo/client';
import { Provider as NextAuthProvider } from 'next-auth/client';
import { StylesProvider, MuiThemeProvider } from '@material-ui/core/styles';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import globals from '../styles/globals';
import muiTheme, { theme } from '../styles/theme';
import { ToastContainer } from 'react-toastify';
import TagManager from 'react-gtm-module';
import { AppWrapper, defaultValue } from '../context/state';
import { GET_ALL_TOTYMS, USERS } from '../graphql/queries';
import Loader from '../components/Loader';
import Seo from '../components/Seo';
import { appUrl, siteInfo } from '../utils/config';

const GlobalStyle = createGlobalStyle`
  ${globals}
`;

export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  const [initProps, setInitProps] = useState(defaultValue);

  useEffect(() => {
    async function getTotyms() {
      const { data } = await apolloClient.query({
        query: GET_ALL_TOTYMS,
      });

      const { data: users } = await apolloClient.query({
        query: USERS,
      });
      setInitProps({ data, users });
    }
    getTotyms();
  }, []);

  useEffect(() => {
    TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS });
  }, []);

  if (initProps == null) return <Loader />;

  return (
    <NextAuthProvider session={pageProps.session}>
      <ApolloProvider client={apolloClient}>
        <StylesProvider injectFirst>
          <MuiThemeProvider theme={muiTheme}>
            <ThemeProvider theme={{ ...muiTheme, ...theme }}>
              <GlobalStyle />
              <Seo
                author=""
                description={siteInfo.description}
                title={siteInfo.title}
                image={siteInfo.image}
                url={appUrl}
              />
              <AppWrapper value={initProps}>
                <Component {...pageProps} />
              </AppWrapper>
              <ToastContainer />
            </ThemeProvider>
          </MuiThemeProvider>
        </StylesProvider>
      </ApolloProvider>
    </NextAuthProvider>
  );
}
