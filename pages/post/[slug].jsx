import React from "react";
import { useRouter } from "next/router";
import { singlePost } from "../../lib/query";

export default function Post({
  post: {
    data: { post },
  },
}) {
  return <div className="text-[9rem]"> {post.title} </div>;
}

export async function getStaticPaths({}) {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export const fetchPost = async (slug) => {
  try {
    const data = await fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
      },
      body: JSON.stringify({
        query: singlePost,
        variables: { title: slug },
      }),
    });
    const post = await data.json();
    return post;
  } catch (error) {
    console.log(error);
  }
};
export async function getStaticProps({ params }) {
  const mySlug = params.slug.split("-").join(" ");
  const post = await fetchPost(mySlug);
  console.log(mySlug);
  return {
    props: { post: post },
  };
}
