import { useEffect } from 'react'
import { fetchFunction } from '../lib/fetchFunction'
import { searchByAuthor, searchByTag, singlePost } from '../lib/query'
import Posts from './posts'
import Sidebar from './sidebar'
import {
  useTagId,
  useAuthorId,
  useSlug,
  useSetTagId,
  useSetAuthorId,
  useSetSlug,
  useSetRenderedData,
  useRenderedData,
} from './store'
function Content({ realTimePosts, error, status }) {
  const tagId = useTagId()
  const authorId = useAuthorId()
  const slug = useSlug()
  const setTagId = useSetTagId()
  const setAuthorId = useSetAuthorId()
  const setSlug = useSetSlug()
  const setRenderedData = useSetRenderedData()
  const renderedData = useRenderedData()

  console.log('content rendered')

  useEffect(() => {
    setRenderedData({ data: realTimePosts })
    setTagId('')
    setAuthorId('')
    setSlug('')
  }, [])

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
  }, [slug, authorId, tagId])

  return (
    <div className=" flex flex-col-reverse md:grid md:grid-cols-[70%_30%] ">
      {status === 'connecting' && <h2> Loading ...</h2>}
      {error && <h2> Try again please ... </h2>}
      <Posts renderedData={renderedData} error={error} status={status} />
      <aside className="mt-8 md:my-8 col-span-1 rounded-lg border-2 border-bordercolor">
        <Sidebar />
      </aside>
    </div>
  )
}

export default Content
