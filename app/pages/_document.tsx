import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body className="bg-gray-100 min-w-max">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
