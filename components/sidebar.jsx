import React from "react";
import { AiOutlineHome } from "react-icons/ai";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { GrArticle } from "react-icons/gr";
import Tags from "../components/tags";
import Link from "next/link";
import Authors from "./authors";
export default function Sidebar() {
  return (
    <div>
      <div className=" text-textcolor flex flex-col m-4 xl:text-lg 2xl:text-lg">
        <div className="flex justify-end items-center">
          <Link href={"/"}>تاتيكا</Link>
          <AiOutlineHome className="ml-2" />
        </div>
        <div className="flex justify-end items-center">
          <Link href={"/tweets"}>التدوينات</Link>
          <HiOutlinePencilSquare className="ml-2" />
        </div>
        <div className="flex justify-end items-center">
          <Link href={"/posts"}>المقالات</Link>
          <GrArticle className="article ml-2" />
        </div>
      </div>
      <h2 className="pb-1 bg-secondbackground text-textsecond w-full pr-4 text-right text-[0.85rem]">
        مواضيع
      </h2>
      <div className="text-textcolor flex flex-col m-4">
        <Tags />
      </div>
      <h2 className="pb-1 bg-secondbackground text-textsecond w-full pr-4 text-right text-[0.85rem]">
        الكاتب
      </h2>
      <div className="text-textcolor flex flex-col m-4">
        <Authors />
      </div>
    </div>
  );
}
