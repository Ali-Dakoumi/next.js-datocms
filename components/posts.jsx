import { Image } from "react-datocms";
import TimeAgo from "react-timeago";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import slugify from "slugify-arabic";
import { CSSTransition, TransitionGroup } from "react-transition-group";

export default function Posts({ renderedData }) {
  return (
    <div className=" mx-auto my-12">
      {renderedData.posts?.length === 0 && (
        <p className="text-xl">لا يوجد مقالات، أعد الإختيار من فضلك ...</p>
      )}
      <TransitionGroup className={"max-w-[90vw] grid gap-4 container"}>
        {renderedData?.posts?.map((post) => (
          <CSSTransition
            key={post.id}
            classNames={{
              enter: "post-enter",
              enterActive: "post-enter-active",
              exit: "post-exit",
              exitActive: "post-exit-active",
            }}
            timeout={{ enter: 1200, exit: 1200 }}
          >
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
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
