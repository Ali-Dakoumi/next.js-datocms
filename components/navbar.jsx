import Image from 'next/image'
import Link from 'next/link'
import Search from './search'

export default function Navbar() {
  console.log('navbar rendered ')
  return (
    <ul className="maw-w-full flex justify-between items-center w-full text-textwhite py-2">
      <li className="mt-2 relative w-12 h-7 md:w-20 md:h-12 font-ilyas ml-2 text-[2rem] md:text-[3rem]">
        <Link href={'/'}>
          <Image src={'/white-logo.svg'} fill alt="logo" />
        </Link>
      </li>
      <li className="mr-2">
        <Search />
      </li>
    </ul>
  )
}
