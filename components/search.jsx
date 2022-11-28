import { useContext } from 'react'
import { BsSearch } from 'react-icons/bs'
import { AppContext } from './contextProvider'
import InputText from './inputText'
export default function Search() {
  const { inputRef } = useContext(AppContext)

  console.log('search component')
  return (
    <form>
      <div className="max-h-[2rem] max-w-[14rem] flex items-center border-2 rounded-lg border-bordercolor bg-secondbackground text-textsecond overflow-hidden">
        <InputText />
        <div className="p-2 text-textsecond cursor-pointer">
          <BsSearch onClick={() => console.log('text', inputRef.current?.value)} />
        </div>
      </div>
    </form>
  )
}
