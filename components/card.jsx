import React, { useMemo } from "react";
import { Image } from "react-datocms";

export default function Card({ data }) {
  console.log(data);

  return (
    <div>
      <div className="relative w-full mb-2 h-auto">
        <div className="w-full h-full text-textcolor flex flex-col overflow-hidden rounded-lg">
          {data && (
            <Image
              className="absolute w-full h-full "
              data={data?.data?.card.image.responsiveImage}
              lazyLoad={true}
              usePlaceholder={false}
            />
          )}
        </div>
        {data?.data?.card.title && (
          <div className="z-10 pb-2 pt-4 w-full text-textcolor absolute bottom-0 right-0 gradient-bg">
            <div className="p-2 text-lg title text-right">
              <ReactMarkdown children={data?.data?.card.title} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
