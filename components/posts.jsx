import { Image } from 'react-datocms'
import TimeAgo from 'react-timeago'
import ReactMarkdown from 'react-markdown'
import { container, itemVariants } from '../lib/animations'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext } from 'react'
import { AppContext } from './contextProvider'
import { useState } from 'react'
import { fetchFunction } from '../lib/fetchFunction'
import { useEffect } from 'react'
import { authorById, tagById } from '../lib/query'
import { data } from 'autoprefixer'

export default function Posts({ renderedData, error, status }) {
  const { setSlug, tagId, authorId, slug } = useContext(AppContext)
  const [authorName, setAuthorName] = useState('')
  const [tagName, setTagName] = useState('')
  const variable = { id: authorId }
  const tagVariable = { id: tagId }
  useEffect(() => {
    if (authorId !== '') {
      const fetchAuthor = async () => {
        const newData = await fetchFunction(variable, authorById)
        setAuthorName(newData.data.author.name)
        console.log(newData.data.author.name)
      }
      fetchAuthor()
    }

    if (tagId !== '') {
      console.log('tag chnaged')
      const fetchTag = async () => {
        const newData = await fetchFunction(tagVariable, tagById)
        setTagName(newData.data.tag.tagname)
        console.log(newData)
      }
      fetchTag()
    }
  }, [authorId, tagId])

  return (
    <div className="col-span-1 my-8 md:mx-8">
      {status === 'connecting' && <h2> Loading ...</h2>}
      {error && <h2> Try again please ... </h2>}
      {tagId === '' && authorId === '' && slug === '' && <p className="text-xl"> جميع المقالات</p>}
      {authorId !== '' && <p className="text-xl">مقالات {authorName} </p>}
      {tagId !== '' && <p className="text-xl">المضوع: {tagName} </p>}
      {renderedData?.data?.posts?.length === 0 && (
        <p className="text-sm">لا يوجد مقالات، أعد الإختيار من فضلك ...</p>
      )}
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
              <motion.div className="item" key={post.id} variants={itemVariants}>
                <div
                  onClick={() => {
                    setSlug(post.title)
                  }}
                >
                  <div className="img-post relative h-[25vw] text-[3rem] justify-between flex-col rounded-2xl overflow-hidden cursor-pointer">
                    {post.photos.map((photo) => (
                      <Image
                        key={photo.responsiveImage.src}
                        className="absolute w-full h-full "
                        data={photo.responsiveImage}
                        lazyLoad={true}
                        usePlaceholder={false}
                      />
                    ))}
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
                </div>
              </motion.div>
            ))}
          {renderedData?.data?.post && (
            <div className="mx-8 text-right ml-8">
              <h1 className="text-[2rem] mb-4">{renderedData?.data?.post.title} </h1>
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
                  <div className="py-2 text-lg title text-right">
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
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
