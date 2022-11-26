import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";
import {
  container,
  itemVariants,
  tweetsContainer,
  tweetsVariants,
} from "../lib/animations";

export default function Tweets({ tweetsData }) {
  console.log("tweets rendered again ");
  return (
    <div className="max-w-full mb-2 overflow-hidden h-auto mr-8">
      <AnimatePresence>
        <motion.div
          className={
            "max-w-full overflow-hidden h-full grid grid-cols-1 grid-rows-3 items-stretch"
          }
          variants={tweetsContainer}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {tweetsData.tweets.map((tweet) => (
            <motion.div key={tweet.id} variants={tweetsVariants}>
              <div>
                <div className="shadow-xl rounded-lg overflow-hidden bg-secondbackground">
                  {tweet.content && (
                    <div className="p-4 text-xs xl:text-lg 2xl:text-lg title text-right">
                      <ReactMarkdown children={tweet.content} />
                    </div>
                  )}
                </div>
                <div className="mt-1 grid grid-cols-2 text-xs xl:text-base 2xl:text-base text-gray-500 px-2 items-center pb-1">
                  <div className="flex items-center">
                    {/* <div className="w-8 h-8 relative">
                      <Image
                        className="rounded-full mr-2 shadow"
                        layout="fill"
                        data={tweet.author.avatar.responsiveImage}
                      />
                    </div> */}
                    <div className="pl-2">{tweet.author.name}</div>
                  </div>
                  <div className="text-right">
                    <TimeAgo date={tweet._firstPublishedAt} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
