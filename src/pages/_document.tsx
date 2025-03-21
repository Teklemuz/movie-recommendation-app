import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { AppProps } from 'next/app'; // Import AppProps for typing

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
                                                        // Enhance the app with styled-components' ServerStyleSheet
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App: React.ComponentType<AppProps>) => (props: AppProps) =>
            sheet.collectStyles(<App {...props} />),
        });

                                                                         // Get the initial props from the Document
      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
