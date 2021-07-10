import App from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import withApolloClient from '../../shared/withApolloClient';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import defaultSEOPropsConfigs from '../../shared/seo/nextSEODefault.config';
import './global.scss';
import MainLayout from '../../components/Layout';

class MyApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
        </Head>
        <ApolloProvider client={apolloClient}>
          <DefaultSeo {...defaultSEOPropsConfigs} />
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </ApolloProvider>
      </>
    );
  }
}

export default withApolloClient(MyApp);
