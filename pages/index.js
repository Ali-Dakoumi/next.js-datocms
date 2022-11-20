import Head from "next/head";
import { request } from "../lib/datocms";
import { useQuerySubscription } from "react-datocms";
import { query, tweetsQuery, tagsQuery, searchByTag } from "../lib/query";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import Posts from "../components/posts";
import Tweets from "../components/tweets";
import Tags from "../components/tags";

export default function Home({ subscription, tweets, tags }) {
  const nodeRef = useRef(null);
  const nodeRefTwo = useRef(null);
  const { data, error, status } = useQuerySubscription(subscription);
  const {
    data: tweetsData,
    error: tweetsError,
    status: tweetsStatus,
  } = useQuerySubscription(tweets);
  const [tagId, setTagId] = useState("");
  const [newTweets, setNewTweets] = useState(tweetsData);
  const [renderedData, setRenderedData] = useState({});
  // ! verify how many renders or api requests usequerysubscription is making
  useEffect(() => {
    setRenderedData(data);
  }, [data]);

  const { data: postsBytagName } = useQuerySubscription({
    query: searchByTag,
    variables: { id: tagId },
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  });
  useEffect(() => {
    if (tagId != "") {
      const newData = postsBytagName;
      setRenderedData(newData);
    } else {
      setRenderedData(data);
    }
  }, [tagId, postsBytagName, data]);

  return (
    <div className="text-textcolor body-font py-12 bg-background px-10">
      <Head>
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="max-w-[90%] mx-auto text-center mt-20 mb-12">
        {status === "connecting" ? (
          <div>Connecting to DatoCMS...</div>
        ) : status === "connected" ? (
          <div className="flex flex-col md:flex-row items-center justify-center">
            <span className="flex h-3 w-3 relative mb-3 md:mb-0 md:mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
            </span>
            <span>Connected to DatoCMS, receiving live updates!</span>
          </div>
        ) : (
          <div>Connection closed</div>
        )}
      </div>

      {error && (
        <div className="max-w-[90%] my-12 mx-auto">
          <h1 className="title-font text-lg font-bold text-gray-900 mb-3">
            Error: {error.code}
          </h1>
          <div className="my-5">{error.message}</div>
          {error.response && (
            <pre className="bg-gray-100 p-5 mt-5 font-mono">
              {JSON.stringify(error.response, null, 2)}
            </pre>
          )}
        </div>
      )}

      <Tweets tweetsData={tweetsData} />
      <Tags tags={tags} tagId={tagId} />
      <Posts renderedData={renderedData} />
    </div>
  );
}

export async function getServerSideProps() {
  const tags = await request({
    query: tagsQuery,
    variables: { limit: 10 },
  });
  const graphqlRequest = {
    query: query,
    variables: { limit: 10 },
  };
  const graphqlTweetRequest = {
    query: tweetsQuery,
    variables: { limit: 3 },
  };
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
      tags,
    },
  };
}
