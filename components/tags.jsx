import { useContext } from 'react'
import { tagsQuery } from '../lib/query'
import { AppContext } from './contextProvider'
import { fetchQuery } from '../lib/fetchFunction'
import { useQuery } from 'react-query'

export default function Tags() {
  const { tagId, setTagId, setAuthorId, setSlug } = useContext(AppContext)
  const { data, status, error } = useQuery('tags', () => fetchQuery(tagsQuery))
  // console.log(tagId);

  return (
    <div className="px-4 max-w-full text-right tag text-[0.75rem] flex justify-end flex-wrap xl:text-lg 2xl:text-lg">
      <button
        onClick={() => {
          setTagId('')
          setAuthorId('')
          setSlug('')
        }}
        className="py-1 px-2 md:ml-2 md:my-2 my-1  ml-1 shadow-md rounded-lg bg-secondbackground text-red-500 text-[0.6rem] md:text-[1rem]"
      >
        الكل
      </button>

      {data?.data?.allTags?.map((tag) => {
        return (
          <button
            key={tag.id}
            value={tag.id}
            onClick={(e) => {
              setTagId(e.target.value)
              setAuthorId('')
              setSlug('')
            }}
            className={`ml-2 md:my-2 my-1 py-1 px-2 shadow-md rounded-lg text-[0.6rem] md:text-[1rem] ${
              tagId === tag.id ? 'bg-red-500 text-textcolor' : 'bg-secondbackground'
            }`}
          >
            {tag.tagname}
          </button>
        )
      })}
    </div>
  )
}
