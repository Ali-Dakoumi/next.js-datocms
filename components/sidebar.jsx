import { AiOutlineHome } from 'react-icons/ai'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import { GrArticle } from 'react-icons/gr'
import Tags from '../components/tags'
import Link from 'next/link'
import Authors from './authors'
export default function Sidebar() {
  return (
    <div className="flex flex-col md:flex-col justify-end">
      <div className=" text-textcolor flex flex-col  xl:text-lg 2xl:text-lg">
        <h2 className="pb-1 mb-2 bg-secondbackground text-textsecond w-full pr-4 text-right text-[0.65rem] md:text-[0.85rem]">
          خريطة الموقع
        </h2>
        <div className="flex flex-row md:flex-col justify-end mb-2">
          <div className="px-4 flex justify-end items-center text-[0.65rem] md:text-[1rem]">
            <Link href={'/'}>تاتيكا</Link>
            <AiOutlineHome className="ml-2" />
          </div>
          <div className="px-4 flex justify-end items-center text-[0.65rem] md:text-[1rem]">
            <Link href={'/tweets'}>التدوينات</Link>
            <HiOutlinePencilSquare className="ml-2" />
          </div>
          <div className="px-4 flex  justify-end items-center text-[0.65rem] md:text-[1rem]">
            <Link href={'/posts'}>المقالات</Link>
            <GrArticle className="article ml-2" />
          </div>
        </div>
      </div>
      <div className="text-textcolor flex flex-col md:max-w-[100%]">
        <h2 className="md:mt-2 pb-1 mb-2 bg-secondbackground text-textsecond w-full pr-4 text-right text-[0.65rem] md:text-[0.85rem] ">
          مواضيع
        </h2>
        <Tags />
      </div>
      <div className="text-textcolor flex flex-col w-full">
        <h2 className="md:mt-2 pb-1 mb-2 bg-secondbackground text-textsecond w-full pr-4 text-right text-[0.65rem] md:text-[0.85rem]">
          الكتاب
        </h2>
        <Authors />
      </div>
    </div>
  )
}
