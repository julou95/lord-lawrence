import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/logos/maskable_icon_x96.png"></link>
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(min-device-width: 768px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(min-device-width: 834px) and (max-device-width: 834px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
          <link rel="apple-touch-startup-image" href="/logos/maskable_icon_x512" media="(min-device-width: 1024px) and (max-device-width: 1024px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait)" />
          <meta name="theme-color" content="#0c0b15" />
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