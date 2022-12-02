import React, { useState, useEffect, useContext } from 'react'
import { Image } from 'react-datocms'
import { useQuery } from 'react-query'
import { fetchQuery } from '../lib/fetchFunction'
import { allAuthors } from '../lib/query'
import { useSetTagId, useSetAuthorId, useSetSlug } from './store'

export default function Authors() {
  const setTagId = useSetTagId()
  const setAuthorId = useSetAuthorId()
  const setSlug = useSetSlug()

  const [authors, setAuthors] = useState(null)

  const { data, status, error } = useQuery('authors', () => fetchQuery(allAuthors))
  useEffect(() => {
    if (data) {
      setAuthors(data.data.allAuthors)
    }
  }, [data])

  return (
    <div className="max-w-full text-right text-[0.5rem]  flex flex-row md:flex justify-end md:flex-col xl:text-lg 2xl:text-lg">
      {/* <button
        onClick={() => {
          setAuthorId('')
          setTagId('')
          setSlug('')
        }}
        className="mx-4 py-1 px-2 ml-2 my-2 max-w-[4rem] self-end shadow-md rounded-lg bg-secondbackground text-red-500"
      >
        الكل
      </button> */}

      {authors &&
        authors?.map((author) => {
          return (
            <div key={author.id} className={`self-end py-1 px-2 flex justify-end items-center `}>
              <div className="cursor-pointer flex flex-col text-[1rem] justify-start">
                <button
                  className="text-right text-[0.6rem] md:text-[1rem]"
                  value={author.id}
                  onClick={(e) => {
                    setAuthorId(e.target.value)
                    setTagId('')
                    setSlug('')
                  }}
                >
                  {author.name}
                </button>
                <button
                  value={author.id}
                  onClick={(e) => {
                    setAuthorId(e.target.value)
                    setTagId('')
                    setSlug('')
                  }}
                  className="text-textsecond mb-0 text-[0.65rem] md:text-[0.85rem] text-right "
                >
                  {' '}
                  محلل فني{' '}
                </button>
              </div>
              <div className="hidden sm:block h-[2.5rem] w-[2.5rem] md:w-[3rem] md:h-[3.3rem] relative ml-4 mr-2 mt-1">
                {author.avatar && (
                  <Image
                    className="rounded-full shadow"
                    layout="fill"
                    data={author.avatar.responsiveImage}
                  />
                )}
              </div>
            </div>
          )
        })}
    </div>
  )
}
