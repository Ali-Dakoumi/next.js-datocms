import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { tagsQuery } from "../lib/query";
import { AppContext } from "./contextProvider";
import { fetchQuery } from "../lib/fetchFunction";
import { useQuery } from "react-query";

export default function Tags() {
  const { tagId, setTagId, setAuthorId, setSlug } = useContext(AppContext);
  const { data, status, error } = useQuery("tags", () => fetchQuery(tagsQuery));
  // console.log(tagId);

  return (
    <div className="max-w-full text-right tag text-[0.75rem] flex justify-end flex-wrap xl:text-lg 2xl:text-lg">
      <button
        onClick={() => {
          setTagId("");
          setAuthorId("");
          setSlug("");
        }}
        className="py-1 px-2 ml-2 my-2 shadow-md rounded-lg bg-secondbackground text-red-500"
      >
        الكل
      </button>

      {data?.data?.allTags?.map((tag) => {
        return (
          <button
            key={tag.id}
            value={tag.id}
            onClick={(e) => {
              setTagId(e.target.value);
              setAuthorId("");
              setSlug("");
            }}
            className={` py-1 px-2 ml-2 my-2 shadow-md rounded-lg ${
              tagId === tag.id
                ? "bg-red-500 text-textcolor"
                : "bg-secondbackground"
            }`}
          >
            {tag.tagname}
          </button>
        );
      })}
    </div>
  );
}
