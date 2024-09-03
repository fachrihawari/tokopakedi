'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface CarouselItem {
  id: number;
  imageUrl: string;
  alt: string;
}

const items: CarouselItem[] = [
  { id: 1, imageUrl: '/img/promo/beli-lokal.webp', alt: 'Carousel Image 1' },
  { id: 2, imageUrl: '/img/promo/antbox.webp', alt: 'Carousel Image 2' },
  { id: 3, imageUrl: '/img/promo/dove.webp', alt: 'Carousel Image 3' },
  { id: 4, imageUrl: '/img/promo/shopaton.webp', alt: 'Carousel Image 4' },
];

const circleClassNames = [
  'w-3 h-3',
  'w-2.5 h-2.5',
  'w-2 h-2',
  'w-1.5 h-1.5',
]

const nextPrevClassNames = 'absolute top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 focus:outline-none'

const Carousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="relative w-full overflow-hidden">

      {/* Carousel Image */}
      <div
        className="flex transition-transform duration-300 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {items.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <Image src={item.imageUrl} alt={item.alt} width={1208} height={300} className='w-full' />
          </div>
        ))}
      </div>

      {/* Carousel Indicator */}
      <div className="absolute left-4 bottom-4 flex items-center space-x-2">
        {items.map((_, index) => {
          const activeClassName = index === currentIndex ? '' : 'bg-opacity-50';
          return (
            <button
              key={index}
              className={`${circleClassNames[index]} rounded-full focus:outline-none bg-white ${activeClassName}`}
              onClick={() => setCurrentIndex(index)}
            />
          )
        })}
      </div>

      {/* Prev */}
      <button
        className={`${nextPrevClassNames} left-4`}
        onClick={prevSlide}
      >
        <FiChevronLeft className="h-6 w-6" />
      </button>

      {/* Next */}
      <button
        className={`${nextPrevClassNames} right-4`}
        onClick={nextSlide}
      >
        <FiChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
};

export default Carousel;
