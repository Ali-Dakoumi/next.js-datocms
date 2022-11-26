import Head from "next/head";
import { request } from "../lib/datocms";
import { useQuerySubscription } from "react-datocms";
import { query, tweetsQuery, tagsQuery, searchByTag } from "../lib/query";
import { useEffect, useRef, useState } from "react";
import Posts from "../components/posts";
import Tweets from "../components/tweets";
import { useContext } from "react";
import { AppContext } from "./_app";
import { Image } from "react-datocms";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import slugify from "slugify-arabic";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { AnimatePresence, motion } from "framer-motion";

export default function Home({ subscription, tweets, tags }) {
  const { data, error, status } = useQuerySubscription(subscription);
  const {
    data: tweetsData,
    error: tweetsError,
    status: tweetsStatus,
  } = useQuerySubscription(tweets);
  const [newTweets, setNewTweets] = useState(tweetsData);
  const [renderedData, setRenderedData] = useState({});
  const { tagId } = useContext(AppContext);
  console.log();
  // ! verify how many renders or api requests usequerysubscription is making
  const { data: postsBytagName } = useQuerySubscription({
    query: searchByTag,
    variables: { id: tagId },
    token: process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN,
  });

  const container = {
    hidden: {
      transition: {
        staggerChildren: 0.02,
        staggerDirection: -1,
      },
    },
    show: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      transition: { type: "spring", bounce: 0.1 },
    },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.1 } },
  };

  useEffect(() => {
    setRenderedData(data);
  }, [data]);

  useEffect(() => {
    if (tagId != "") {
      const newData = postsBytagName;
      setRenderedData(newData);
    } else {
      setRenderedData(data);
    }
  }, [tagId, postsBytagName, data]);

  return (
    <div>
      {renderedData?.posts?.length === 0 && (
        <p className="text-xl">لا يوجد مقالات، أعد الإختيار من فضلك ...</p>
      )}
      <AnimatePresence>
        <motion.div
          className="mx-auto my-12 max-w-[90vw] grid gap-4 container"
          variants={container}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {renderedData?.posts?.map((post) => (
            <motion.div className="item" key={post.id} variants={itemVariants}>
              <Link
                href={`/post/${slugify(post.title, {
                  remove: /[$*_+~.()'"!\-:@]+/g,
                })}`}
              >
                <div className="h-[350px]  text-[3rem] justify-between flex-col relative rounded-2xl overflow-hidden cursor-pointer">
                  <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
                    {post.photos.map((photo) => (
                      <Image
                        key={photo.responsiveImage.src}
                        className="w-full h-full object-cover"
                        data={photo.responsiveImage}
                        lazyLoad={true}
                        usePlaceholder={false}
                      />
                    ))}
                  </div>
                  <div className="z-10 pb-2 pt-4 w-full text-textcolor absolute bottom-0 right-0 gradient-bg">
                    {post.title && (
                      <div className="p-2 text-lg title text-right">
                        <ReactMarkdown children={post.title} />
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      {/* <div className="w-8 h-8 relative">
                      {post.author.avatar && (
                        <Image
                          className="rounded-full mr-2 shadow"
                          layout="fill"
                          data={post.author.avatar.responsiveImage}
                        />
                      )}
                    </div> */}
                      <div className="px-2 text-xs">{post.author.name}</div>
                      <div className="px-2 text-right text-xs">
                        <TimeAgo date={post._firstPublishedAt} />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>{" "}
      </AnimatePresence>
    </div>
  );
}

export async function getServerSideProps() {
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
      // tags,
    },
  };
}
