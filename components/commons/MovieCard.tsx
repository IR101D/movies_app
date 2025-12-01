import { MovieProps } from "@/interfaces"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"

const MovieCard: React.FC<MovieProps> = ({ id, title, posterImage, releaseYear }) => {
  const [imageError, setImageError] = useState(false)
  
  const handleImageError = () => {
    setImageError(true)
  }

  // Use fallback if image fails or is missing
  const imageSrc = posterImage && !imageError ? posterImage : "/images/no-poster.jpg"

  return (
    <Link href={`/movies/${id}`}>
      <div className="h-[563px] cursor-pointer group">
        <div className="relative h-[430px] w-full rounded-md overflow-hidden bg-gray-800">
          {posterImage && !imageError ? (
            <Image 
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
              src={posterImage}
              width={300} 
              height={430} 
              alt={title}
              onError={handleImageError}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center">
                <div className="text-4xl mb-2">🎬</div>
                <div className="text-sm">No Poster</div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between py-4">
          <p className="text-xl font-bold line-clamp-2 group-hover:text-[#E2D609] transition-colors flex-1 mr-2">
            {title}
          </p>
          <p className="text-xl text-[#E2D609] whitespace-nowrap">
            {releaseYear}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default MovieCard