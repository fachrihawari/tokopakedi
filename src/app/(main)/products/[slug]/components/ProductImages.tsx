'use client'

import Image from 'next/image'
import { useState, useRef } from 'react'

interface ProductImagesProps {
  images: string[]
  name: string
}

export default function ProductImages({ images, name }: ProductImagesProps) {
  const [activeImage, setActiveImage] = useState(images[0])
  const [isZoomed, setIsZoomed] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const { left, top, width, height } = imageRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width * 100
    const y = (e.clientY - top) / height * 100
    imageRef.current.style.backgroundPosition = `${x}% ${y}%`
  }

  return (
    <div className="product-images space-y-4">
      <div
        ref={imageRef}
        className={`w-full h-[500px] rounded-lg cursor-zoom-in overflow-hidden relative ${
          isZoomed ? 'bg-no-repeat bg-origin-border' : ''
        }`}
        style={{
          backgroundImage: isZoomed ? `url(${activeImage})` : 'none',
          backgroundSize: isZoomed ? '200%' : 'auto',
        }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {!isZoomed && (
          <Image
            src={activeImage}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        )}
      </div>
      <div className="flex justify-center gap-4">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt={`${name} thumbnail ${index + 1}`}
            width={100}
            height={100}
            className={`rounded-md cursor-pointer hover:opacity-80 transition-opacity ${
              activeImage === image ? 'ring-2 ring-green-500' : ''
            }`}
            onClick={() => setActiveImage(image)}
          />
        ))}
      </div>
    </div>
  )
}
