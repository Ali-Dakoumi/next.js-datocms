import { allSlugs, singlePost } from '../../lib/query'
import { fetchFunction, fetchQuery } from '../../lib/fetchFunction'
import ReactMarkdown from 'react-markdown'
import slugify from 'slugify-arabic'
import Sidebar from '../../components/sidebar'
import { Image, renderMetaTags } from 'react-datocms'
import TimeAgo from 'react-timeago'
import Head from 'next/head'
import Link from 'next/link'
import { useSetRenderedData, useSetSlug } from '../../components/store'

export default function Post({
  post: {
    data: { post },
  },
}) {
  const metaTags = post.seo

  const setSlug = useSetSlug()
  const setRenderedData = useSetRenderedData()

  return (
    <div className=" flex flex-col px-10">
      <Head> {renderMetaTags(metaTags)} </Head>
      <div className="md:mx-8 text-right my-8 ml-8">
        <div>
          <Link
            href={'/'}
            onClick={() => {
              setSlug('')
            }}
            className="py-1 px-2 md:ml-2 md:my-2 my-1  ml-1 shadow-md rounded-lg bg-secondbackground text-red-500 text-[0.6rem] md:text-[1rem]"
          >
            كل المقالات
          </Link>
        </div>
        <div className="w-full flex justify-end items-center">
          <h1 className="text-[1rem] md:text-[2rem] my-4">{post.title} </h1>
        </div>
        <div className="relative h-[35vw] text-[3rem] justify-between flex-col rounded-2xl overflow-hidden">
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
      {/* <aside className="mt-8 md:my-8 col-span-1 rounded-lg border-2 border-bordercolor">
        <Sidebar />
      </aside> */}
    </div>
  )
}

export async function getStaticPaths({}) {
  const {
    data: { slugs },
  } = await fetchQuery(allSlugs)
  const paths = slugs.map((post) => ({
    params: {
      slug: slugify(post.title, {
        remove: /[$*_+~.()'"!\-:@]+/g,
      }).toString(),
    },
  }))
  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const mySlug = params.slug.split('-').join(' ')
  const variable = { title: mySlug }
  const post = await fetchFunction(variable, singlePost)
  return {
    props: { post: post },
  }
}
