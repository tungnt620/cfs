import App from 'next/app';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { DefaultSeo } from 'next-seo';
import Head from 'next/head';
import defaultSEOPropsConfigs from '../shared/seo/nextSEODefault.config';
import '../../../libs/ui/src/lib/styles/global.scss';
import MainLayout from '../components/Layout';
import { withApollo } from '@cfs/helper';

const noLayoutComponents = ['NewCfs', 'AllCategories'];

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
            content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"
          />
        </Head>
        <ApolloProvider client={apollo}>
          <DefaultSeo {...defaultSEOPropsConfigs} />
          {noLayoutComponents.includes(Component.name) ? (
            <Component {...pageProps} />
          ) : (
            <MainLayout>
              <Component {...pageProps} />
            </MainLayout>
          )}
        </ApolloProvider>
      </>
    );
  }
}

export default withApollo(MyApp);
