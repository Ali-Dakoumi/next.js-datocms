import Head from 'next/head'
import React from 'react'

export default function IndexHead() {
  return (
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
      <meta property="og:url" content="https://tattica.io/ " />
      <meta property="og:title" content="Tattica - تاتيكا" />
      <meta
        property="og:description"
        content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب "
      />
      <meta property="og:image" content="/image.svg" />

      <meta property="twitter:card" content="/image.svg" />
      <meta property="twitter:url" content="https://tattica.io/" />
      <meta property="twitter:title" content="Tattica - تاتيكا" />
      <meta
        property="twitter:description"
        content="موقع رياضي مختص في التكتيك و تصحيح المفاهيم - هنا تجد نخبة المحللين العرب "
      />
      <meta property="twitter:image" content="/image.svg"></meta>
      <title>Tattica</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  )
}
