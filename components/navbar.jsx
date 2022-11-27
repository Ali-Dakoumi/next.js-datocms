import Link from 'next/link'
import Search from './search'

export default function Navbar() {
  console.log('navbar rendered ')
  return (
    <ul className="maw-w-full flex justify-between items-center w-full text-textwhite">
      <li className="font-ilyas text-[3rem]">
        <Link href={'/'}>TATTICA</Link>
      </li>
      <li>
        <h2>موقع رياضي مختص في تصحيح المفاهيم، تحليل المباريات و الحديث عن التكتيك</h2>
      </li>
      <li className="mx-8">
        <Search />
      </li>
    </ul>
  )
}
