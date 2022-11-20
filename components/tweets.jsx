import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import { CSSTransition, TransitionGroup } from "react-transition-group";
export default function Tweets({ tweetsData }) {
  return (
    <div className="max-w-[90%] mx-auto my-12">
      <TransitionGroup className={"max-w-[90vw] flex flex-col gap-1 container"}>
        {tweetsData.tweets.map((tweet) => (
          <CSSTransition
            key={tweet.id}
            classNames={{
              enter: "tweet-enter",
              enterActive: "tweet-enter-active",
              exit: "tweet-exit",
              exitActive: "tweet-exit-active",
            }}
            timeout={{ enter: 1200, exit: 1200 }}
          >
            <div>
              <div className="shadow-xl rounded-lg overflow-hidden bg-secondbackground">
                {tweet.content && (
                  <div className="p-4 text-xs title text-right">
                    <ReactMarkdown children={tweet.content} />
                  </div>
                )}
              </div>
              <div className="mt-1 grid grid-cols-2 text-xs md:text-sm text-gray-500 md:px-8 items-center pb-2">
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
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
