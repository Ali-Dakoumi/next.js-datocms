import React from "react";
import { useState } from "react";
import { useEffect, useContext } from "react";
import { useQuery } from "react-query";
import { fetchQuery } from "../lib/fetchFunction";
import { allAuthors } from "../lib/query";
import { AppContext } from "./contextProvider";

export default function Authors() {
  const { authorId, setAuthorId, setTagId, setSlug } = useContext(AppContext);
  const [authors, setAuthors] = useState(null);

  const { data, status, error } = useQuery("authors", () =>
    fetchQuery(allAuthors)
  );

  useEffect(() => {
    if (data) {
      setAuthors(data.data.allAuthors);
    }
  }, [data]);

  return (
    <div className="max-w-full text-right tag text-[0.75rem] flex justify-end flex-wrap xl:text-lg 2xl:text-lg">
      <button
        onClick={() => {
          setAuthorId("");
          setTagId("");
          setSlug("");
        }}
        className="py-1 px-2 ml-2 my-2 shadow-md rounded-lg bg-secondbackground text-red-500"
      >
        الكل
      </button>

      {authors &&
        authors?.map((author) => {
          return (
            <button
              key={author.id}
              value={author.id}
              onClick={(e) => {
                setAuthorId(e.target.value);
                setTagId("");
                setSlug("");
              }}
              className={` py-1 px-2 ml-2 my-2 shadow-md rounded-lg ${
                authorId === author.id
                  ? "bg-red-500 text-textcolor"
                  : "bg-secondbackground"
              }`}
            >
              {author.name}
            </button>
          );
        })}
    </div>
  );
}
