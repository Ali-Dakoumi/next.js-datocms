import Image from 'next/image'

export default function Card({ data }) {
  return (
    <div>
      <div className="relative hidden md:block w-full mb-2 h-full">
        <div className="w-full h-full text-textcolor flex flex-col overflow-hidden rounded-lg">
          {data && (
            <Image
              className="absolute w-full h-full rounded-lg"
              src={data?.data?.card.image.webp}
              alt="hero image"
              priority
              fill
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
  )
}
