import { BsSearch } from 'react-icons/bs'
import InputText from './inputText'
import {
  useRenderedData,
  useSearchBool,
  useSearchVariable,
  useSetRenderedData,
  useSetSearchBool,
  useSetSearchVariable,
} from './store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { fetchFunction } from '../lib/fetchFunction'
import { searchPosts } from '../lib/query'
export default function Search() {
  const router = useRouter()
  const searchVariable = useSearchVariable()
  const searchBool = useSearchBool()
  const setSearchVariable = useSetSearchVariable()
  const setSearchBool = useSetSearchBool()
  const setRenderedData = useSetRenderedData()
  const renderedData = useRenderedData()

  console.log('parent re render')
  const handleSubmit = (e) => {
    e.preventDefault()
    searchVariable !== '' && setSearchBool(true)
  }

  useEffect(() => {
    setSearchBool(false)
    setSearchVariable('')
  }, [])

  useEffect(() => {
    if (searchVariable !== '' && searchBool === true) {
      const fetchPosts = async () => {
        const variable = { search: searchVariable }
        const newData = await fetchFunction(variable, searchPosts)
        setRenderedData(newData)
        console.log(renderedData)
      }
      fetchPosts()
    }
  }, [searchBool])

  if (router.pathname !== '/') return <div></div>
  return (
    <form onSubmit={handleSubmit}>
      <div className="max-h-[1.6rem] max-w-[15rem] flex items-center border-2 rounded-lg border-bordercolor bg-secondbackground text-textsecond overflow-hidden">
        <InputText />
        <button className="p-2 text-textsecond cursor-pointer" type="submit">
          <BsSearch />
        </button>
      </div>
    </form>
  )
}
