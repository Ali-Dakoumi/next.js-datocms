import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { fetchFunction } from '../lib/fetchFunction'
import { searchByAuthor, searchByTag, singlePost } from '../lib/query'
import Posts from './posts'
import Sidebar from './sidebar'

function Content({ realTimePosts, error, status }) {
  return (
    <div className=" flex flex-col-reverse md:grid md:grid-cols-[70%_30%] ">
      {status === 'connecting' && <h2> Loading ...</h2>}
      {error && <h2> Try again please ... </h2>}
      <Posts realTimePosts={realTimePosts} error={error} status={status} />
      <aside className="mt-8 md:my-8 col-span-1 rounded-lg border-2 border-bordercolor">
        <Sidebar />
      </aside>
    </div>
  )
}

export default Content
