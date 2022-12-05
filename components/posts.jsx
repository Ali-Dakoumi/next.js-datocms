import { Image } from 'react-datocms'
import TimeAgo from 'react-timeago'
import ReactMarkdown from 'react-markdown'
import { container, itemVariants } from '../lib/animations'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { fetchFunction } from '../lib/fetchFunction'
import { useEffect } from 'react'
import { authorById, searchByAuthor, searchByTag, singlePost, tagById } from '../lib/query'
import { data } from 'autoprefixer'
import Link from 'next/link'
import slugify from 'slugify-arabic'
import {
  useTagId,
  useAuthorId,
  useSlug,
  useSetTagId,
  useSetAuthorId,
  useSetSlug,
  useSetRenderedData,
  useRenderedData,
  useSearchBool,
  useSearchVariable,
} from './store'

export default function Posts({ realTimePosts, error, status }) {
  const setRenderedData = useSetRenderedData()
  const renderedData = useRenderedData()
  const tagId = useTagId()
  const authorId = useAuthorId()
  const slug = useSlug()
  const setTagId = useSetTagId()
  const setAuthorId = useSetAuthorId()
  const setSlug = useSetSlug()
  const searchBool = useSearchBool()
  const searchVariable = useSearchVariable()

  const [authorName, setAuthorName] = useState('')
  const [tagName, setTagName] = useState('')
  const variable = { id: authorId }
  const tagVariable = { id: tagId }

  useEffect(() => {
    setRenderedData({ data: realTimePosts })
    setTagId('')
    setAuthorId('')
    setSlug('')
  }, [])

  useEffect(() => {
    if (authorId !== '') {
      const fetchAuthor = async () => {
        const newData = await fetchFunction(variable, authorById)
        setAuthorName(newData.data.author.name)
      }
      fetchAuthor()
    }

    if (tagId !== '') {
      console.log('tag chnaged')
      const fetchTag = async () => {
        const newData = await fetchFunction(tagVariable, tagById)
        setTagName(newData.data.tag.tagname)
      }
      fetchTag()
    }
  }, [authorId, tagId])

  console.log('content rendered')

  useEffect(() => {
    if (slug != '') {
      setTagId('')
      setAuthorId('')
      const variable = { title: slug }
      const fetchData = async () => {
        const newData = await fetchFunction(variable, singlePost)
        setRenderedData(newData)
      }
      fetchData()
    } else if (tagId != '' && authorId === '') {
      const variable = { id: tagId }
      const fetchData = async () => {
        const newData = await fetchFunction(variable, searchByTag)
        setRenderedData(newData)
      }
      fetchData()
    } else if (authorId != '' && tagId === '') {
      const variable = { id: authorId }
      const fetchData = async () => {
        const newData = await fetchFunction(variable, searchByAuthor)
        setRenderedData(newData)
      }
      fetchData()
    } else if (authorId === '' && tagId === '' && slug === '') {
      setRenderedData({ data: realTimePosts })
    }
  }, [authorId, tagId, slug])

  useEffect(() => {
    if (searchVariable === '') {
      setRenderedData({ data: realTimePosts })
    }
  }, [searchBool])

  return (
    <div className="col-span-1 my-8 md:mx-8">
      <div className="pb-2 flex justify-between items-center w-full">
        <div>
          {(authorId !== '' || tagId !== '' || slug !== '') && (
            <button
              onClick={() => {
                setTagId('')
                setAuthorId('')
                setSlug('')
              }}
              className="py-1 px-2 md:ml-2 md:my-2 my-1  ml-1 shadow-md rounded-lg bg-secondbackground text-red-500 text-[0.6rem] md:text-[1rem]"
            >
              كل المقالات
            </button>
          )}
        </div>
        <div>
          {status === 'connecting' && <h2> Loading ...</h2>}
          {error && <h2> Try again please ... </h2>}
          {tagId === '' && authorId === '' && slug === '' && (
            <p className="text-sm md:text-xl"> جميع المقالات</p>
          )}
          {authorId !== '' && <p className="text-sm md:text-xl">مقالات {authorName} </p>}
          {tagId !== '' && <p className="text-sm md:text-xl">الموضوع: {tagName} </p>}
          {renderedData?.data?.posts?.length === 0 && (
            <p className="text-sm">لا يوجد مقالات، أعد الإختيار من فضلك ...</p>
          )}
        </div>
      </div>
      <AnimatePresence>
        <motion.div
          className=" max-w-[90vw] grid gap-4 container"
          variants={container}
          initial="hidden"
          animate="show"
          exit="hidden"
        >
          {renderedData?.data?.posts?.length > 0 &&
            renderedData?.data?.posts?.map((post) => (
              <motion.article
                className="item"
                key={post.id}
                variants={itemVariants}
                initial="hidden"
                animate="show"
                exit="hidden"
                whileHover={{
                  y: -10,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  href={`/post/${slugify(post.title, {
                    remove: /[$*_+~.()'"!\-:@]+/g,
                  })}`}
                >
                  <div className="img-post relative h-[35vw] md:h-[25vw] text-[3rem] justify-between flex-col rounded-2xl overflow-hidden cursor-pointer">
                    {post.photos.map((photo) => (
                      <Image
                        key={photo.responsiveImage.src}
                        className="absolute w-full h-full "
                        data={photo.responsiveImage}
                        lazyLoad={true}
                        usePlaceholder={false}
                      />
                    ))}
                    <div className="text-[0.8rem] md:text-[3rem] z-10 pb-2 pt-4 w-full text-textwhite absolute bottom-0 right-0 gradient-bg">
                      {post.title && (
                        <div className="text-[0.8rem] md:text-[1rem] p-2 title text-right">
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
                        <div className="px-2 text-[0.65rem] md:text-xs text-textcolor">
                          {post.author.name}
                        </div>
                        <div className="px-2 text-right text-[0.65rem] md:text-xs text-textcolor">
                          <TimeAgo date={post._firstPublishedAt} />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          {renderedData?.data?.post && (
            <article className="mx-8 text-right ml-8">
              <h1 className="text-[0.8rem] md:text-[1rem] mb-4">
                {renderedData?.data?.post.title}
              </h1>
              <div className="img-post relative h-[35vw] text-[3rem] justify-between flex-col rounded-2xl overflow-hidden">
                {renderedData?.data?.post.photos.map((photo) => (
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
                {renderedData?.data?.post.content && (
                  <div className="par py-2 text-lg title text-right ">
                    <ReactMarkdown children={renderedData?.data?.post.content} />
                  </div>
                )}
                <div className="flex justify-between items-center mt-4">
                  <div className="flex items-center ">
                    <div className="w-8 h-8 relative">
                      {renderedData?.data?.post.author.avatar && (
                        <Image
                          className="rounded-full mr-2 shadow"
                          layout="fill"
                          data={renderedData?.data?.post.author.avatar.responsiveImage}
                        />
                      )}
                    </div>
                    <div className="px-2 text-xs">{renderedData?.data?.post.author.name}</div>
                  </div>
                  <div className="px-2 text-right text-xs">
                    <TimeAgo date={renderedData?.data?.post._firstPublishedAt} />
                  </div>
                </div>
              </div>
            </article>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
