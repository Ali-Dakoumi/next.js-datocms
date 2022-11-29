import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ar">
      <Head>
        <meta name="title" content="Tattica - تاتيكا " />
        <meta
          name="description"
          content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب"
        />
        <meta
          name="keywords"
          content="football, tattica, kora, كورة , tactic, coach, match analysis, تحليل , تكتيك , مباراة , كرة قدم "
        />
        <meta name="robots" content="index, follow" />
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Arabic" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://metatags.io/ " />
        <meta property="og:title" content="Tattica - تاتيكا" />
        <meta
          property="og:description"
          content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب "
        />
        <meta
          property="og:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://metatags.io/" />
        <meta property="twitter:title" content="Tattica - تاتيكا" />
        <meta
          property="twitter:description"
          content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب "
        />
        <meta
          property="twitter:image"
          content="https://metatags.io/assets/meta-tags-16a33a6a8531e519cc0936fbba0ad904e52d35f34a46c97a2c9f6f7dd7d336f2.png"
        ></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
