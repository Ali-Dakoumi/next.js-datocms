import Head from 'next/head'
import React from 'react'

export default function IndexHead() {
  return (
    <Head>
      <title>Tattica - تاتيكا</title>
      <meta name="title" content="Tattica - تاتيكا" />
      <meta
        name="description"
        content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب"
      />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://next-js-datocms.vercel.app/" />
      <meta property="og:title" content="Tattica - تاتيكا" />
      <meta
        property="og:description"
        content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب"
      />
      <meta
        property="og:image"
        content="https://www.datocms-assets.com/85796/1669712932-slide-16_9-2.svg"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://next-js-datocms.vercel.app/" />
      <meta property="twitter:title" content="Tattica - تاتيكا" />
      <meta
        property="twitter:description"
        content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب"
      />
      <meta
        property="twitter:image"
        content="https://www.datocms-assets.com/85796/1669712932-slide-16_9-2.svg"
      />
      <title>Tattica</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
