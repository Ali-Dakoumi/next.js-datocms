import { allSlugs, singlePost } from "../../lib/query";
import { fetchFunction } from "../../lib/fetchFunction";
import ReactMarkdown from "react-markdown";
import slugify from "slugify-arabic";
import Sidebar from "../../components/sidebar";
import { Image } from "react-datocms";
import TimeAgo from "react-timeago";

export default function Post({
  post: {
    data: { post },
  },
}) {
  return (
    <div className="grid grid-cols-[70%_30%] px-10">
      <div className="mx-8 text-right my-8 ml-8">
        <h1 className="text-[2rem] my-4">{post.title} </h1>
        <div className="relative h-[25vw] text-[3rem] justify-between flex-col rounded-2xl overflow-hidden">
          {post.photos.map((photo) => (
            <Image
              key={photo.responsiveImage.src}
              className="absolute w-full h-full "
              data={photo.responsiveImage}
              lazyLoad={true}
              usePlaceholder={false}
            />
          ))}
        </div>

        <div className="z-10 pb-2 pt-4 w-full text-textcolor">
          {post.content && (
            <div className="p-2 text-lg title text-right">
              <ReactMarkdown children={post.content} />
            </div>
          )}
          <div className="flex justify-between items-center mt-4">
            <div className="flex items-center ">
              <div className="w-8 h-8 relative">
                {post.author.avatar && (
                  <Image
                    className="rounded-full mr-2 shadow"
                    layout="fill"
                    data={post.author.avatar.responsiveImage}
                  />
                )}
              </div>
              <div className="px-2 text-xs">{post.author.name}</div>
            </div>
            <div className="px-2 text-right text-xs">
              <TimeAgo date={post._firstPublishedAt} />
            </div>
          </div>
        </div>
      </div>
      <aside className="my-8 col-span-1 rounded-lg border-2 border-bordercolor sticky top-0 ">
        <Sidebar />
      </aside>
    </div>
  );
}

export async function getStaticPaths({}) {
  const {
    data: { slugs },
  } = await fetchFunction("", allSlugs);
  const paths = slugs.map((post) => ({
    params: {
      slug: slugify(post.title, {
        remove: /[$*_+~.()'"!\-:@]+/g,
      }).toString(),
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const mySlug = params.slug.split("-").join(" ");
  const variable = { title: mySlug };
  const post = await fetchFunction(variable, singlePost);
  console.log(mySlug);
  return {
    props: { post: post },
  };
}
