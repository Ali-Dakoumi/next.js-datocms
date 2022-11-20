import React from "react";

export default function Tags({ tags, tagId }) {
  return (
    <div className="max-w-[90vw] mx-auto my-12">
      <button
        onClick={() => {
          setTagId("");
        }}
        className="mx-2 py-1 px-4 shadow-md rounded-lg bg-secondbackground text-red-500"
      >
        X
      </button>

      {tags.allTags.map((tag) => {
        return (
          <button
            key={tag.id}
            value={tag.id}
            onClick={(e) => {
              setTagId(e.target.value);
            }}
            className={`mx-2 py-1 px-2 shadow-md rounded-lg ${
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
