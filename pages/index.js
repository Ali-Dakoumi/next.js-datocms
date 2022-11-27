import Head from 'next/head'
import { request } from '../lib/datocms'
import { useQuerySubscription } from 'react-datocms'
import { useQuery } from 'react-query'
import { query, tweetsQuery, cardQuery } from '../lib/query'
import Tweets from '../components/tweets'
import Card from '../components/card'
import Content from '../components/content'
import { fetchQuery } from '../lib/fetchFunction'

export default function Home({ subscription, tweets }) {
  // console.log("parent re render");
  const { data: realTimePosts, error, status } = useQuerySubscription(subscription)
  const {
    data: tweetsData,
    error: tweetsError,
    status: tweetsStatus,
  } = useQuerySubscription(tweets)

  const { data: cardData } = useQuery('card', () => fetchQuery(cardQuery))

  // ! verify how many renders or api requests usequerysubscription is making

  return (
    <div className="text-textcolor body-font py-8 bg-background px-10">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-[100%] mx-auto text-center mb-4 text-textwhite">
        {status === 'connecting' ? (
          <div>Connecting to DatoCMS...</div>
        ) : status === 'connected' ? (
          <div className="flex flex-col md:flex-row items-center justify-center">
            {status === 'connected' && <h2> You are online now</h2>}
            {status === 'connecting' && <h2> Loading ...</h2>}
            {error && <h2> Try again please ... </h2>}
            <span className="flex h-3 w-3 relative mb-3 md:mb-0 mx-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
          </div>
        ) : (
          <div>Connection closed</div>
        )}
      </div>

      {error && (
        <div className="max-w-[100%] my-12 mx-auto">
          <h1 className="title-font text-lg font-bold text-gray-900 mb-3">Error: {error.code}</h1>
          <div className="my-5">{error.message}</div>
          {error.response && (
            <pre className="bg-gray-100 p-5 mt-5 font-mono">
              {JSON.stringify(error.response, null, 2)}
            </pre>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse md:grid md:grid-cols-[70%_30%] pt-8">
        <Tweets tweetsData={tweetsData} />
        <Card data={cardData} error={error} status={status} />
      </div>
      <div className="w-full">
        <Content realTimePosts={realTimePosts} />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const graphqlRequest = {
    query: query,
    variables: { limit: 10 },
  }
  const graphqlTweetRequest = {
    query: tweetsQuery,
    variables: { limit: 3 },
  }
  return {
    props: {
      subscription: {
        ...graphqlRequest,
        initialData: await request(graphqlRequest),
        token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
      },
      tweets: {
        ...graphqlTweetRequest,
        initialData: await request(graphqlTweetRequest),
        token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
      },
    },
  }
}
