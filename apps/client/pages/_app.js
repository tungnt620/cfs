import App from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { DefaultSeo } from 'next-seo';
import defaultSEOPropsConfigs from '../shared/seo/nextSEODefault.config';
import '../../../libs/ui/src/lib/styles/global.scss';
import MainLayout from '../components/Layout';
import { withApollo } from '@cfs/helper';
import Head from 'next/head';
import { version as appVersion } from '../../../package.json';
import { ChakraProvider } from "@chakra-ui/react"

if (typeof window !== 'undefined') {
  window.appVersion = appVersion;
}

if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  const ReactDOM = require('react-dom');
  const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apollo } = this.props;

    return (
      <>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
        </Head>
        <ApolloProvider client={apollo}>
          <DefaultSeo {...defaultSEOPropsConfigs} />

          <ChakraProvider>
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          </ChakraProvider>
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
