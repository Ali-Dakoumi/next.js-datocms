import { BsSearch } from 'react-icons/bs'
import InputText from './inputText'
import { useSearchVariable, useSetSearchBool } from './store'
import { useRouter } from 'next/router'
export default function Search() {
  const router = useRouter()
  // const { setSearchBool, searchVariable, setSearchVariable, searchBool } = useContext(AppContext)
  console.log(router)
  const searchVariable = useSearchVariable()

  const setSearchBool = useSetSearchBool()
  console.log('search component')

  const handleSubmit = (e) => {
    e.preventDefault()
    searchVariable !== '' && setSearchBool(true)
  }

  if (router.pathname !== '/') return <div></div>
  return (
    <form onSubmit={handleSubmit}>
      <div className="max-h-[2rem] max-w-[14rem] flex items-center border-2 rounded-lg border-bordercolor bg-secondbackground text-textsecond overflow-hidden">
        <InputText />
        <button className="p-2 text-textsecond cursor-pointer" type="submit">
          <BsSearch />
        </button>
      </div>
    </form>
  )
}
