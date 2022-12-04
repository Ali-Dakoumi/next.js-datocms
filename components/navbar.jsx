import Image from 'next/image'
import Link from 'next/link'
import Search from './search'
import { useSetSearchVariable, useSetSearchBool } from './store'
export default function Navbar() {
  console.log('navbar rendered ')
  // const setSearchVariable = useSetSearchVariable()
  // const setSearchBool = useSetSearchBool()
  return (
    <ul className="maw-w-full flex justify-between items-center w-full text-textwhite py-1">
      <li className=" relative w-12 h-7 font-ilyas ml-2 text-[2rem] md:text-[3rem]">
        <Link
          href={'/'}
          // onClick={() => {
          //   setSearchBool(false)
          //   setSearchVariable('')
          // }}
        >
          <Image src={'/white-logo.svg'} fill alt="logo" />
        </Link>
      </li>
      <li className="mr-2">
        <Search />
      </li>
    </ul>
  )
}
