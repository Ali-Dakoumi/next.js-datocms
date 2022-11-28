import Link from 'next/link'
import Search from './search'

export default function Navbar() {
  console.log('navbar rendered ')
  return (
    <ul className="maw-w-full flex justify-between items-center w-full text-textwhite">
      <li className="mt-2 font-ilyas pl-1 text-[2rem] md:text-[3rem]">
        <Link href={'/'}>TATTICA</Link>
      </li>
      <li className="mr-2">
        <Search />
      </li>
    </ul>
  )
}
