import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang='vi'>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, minimum-scale=1"
          />
          <link rel="dns-prefetch" href="//fonts.googleapis.com" />
          <meta httpEquiv="content-language" content="vi" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
          (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
              ga('create', 'UA-102911661-1', 'auto');
              ga('send', 'pageview');
          `,
            }}
          />
          <meta
            name="google-site-verification"
            content="CK5nwFZ2WpMOtJOJ1X590SvWrzQCZHByEkjFq5Gk6cI"
          />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
