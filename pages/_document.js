import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";
import { CacheProvider } from "@emotion/react";
import { ServerStyleSheets } from "@material-ui/core/styles";
import { wrapper } from "../stateManagement/store";

// const getCache = () => {
//   const cache = createCache({ key: "css", prepend: true });
//   cache.compat = true;
//   return cache;
// };

export default class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return { ...initialProps };
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,200;0,300;0,400;0,500;0,600;1,200;1,300&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Style+Script&display=swap"
            rel="stylesheet"
          ></link>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
            crossorigin="anonymous"
          ></link>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/radish-icons/apple-touch-icon.png"
          />
        </Head>
        <body>
          <div id="topLevelPortalContainer" />
          <Main />
          <NextScript />
        </body>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
          integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
          integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
          crossorigin="anonymous"
        ></script>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;
  // const cache = getCache();
  // const { extractCriticalToChunks } = createEmotionServer(cache);
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);
  // const emotionStyles = extractCriticalToChunks(initialProps.html);
  // const emotionStyleTags = emotionStyles.styles.map((style) => (
  //   <style
  //     data-emotion={`${style.key} ${style.ids.join(" ")}`}
  //     key={style.key}
  //     // eslint-disable-next-line react/no-danger
  //     dangerouslySetInnerHTML={{ __html: style.css }}
  //   />
  // ));

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

// // (
//   <CacheProvider value={cache}>
//   <Component {...props} />
// </CacheProvider>
// ),
