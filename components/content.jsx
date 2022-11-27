import { useContext, useEffect } from 'react'
import { fetchFunction } from '../lib/fetchFunction'
import { searchByAuthor, searchByTag, singlePost } from '../lib/query'
import { AppContext } from './contextProvider'
import Posts from './posts'
import Sidebar from './sidebar'

function Content({ realTimePosts, error, status }) {
  console.log('content rendered')
  const { tagId, authorId, setAuthorId, setTagId, slug, setSlug, renderedData, setRenderedData } =
    useContext(AppContext)

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
      <aside className="my-8 col-span-1 rounded-lg border-2 border-bordercolor">
        <Sidebar />
      </aside>
    </div>
  )
}

export default Content
