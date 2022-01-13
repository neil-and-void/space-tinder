import React from 'react';
import Image from 'next/image';
import Card from '../Card';

interface LikedImagesProps {
  images: APODImage[];
  onClick: (image: APODImage) => void;
  onUnlikeImage: () => void;
}

const LikedImages = ({ images, onClick }: LikedImagesProps) => {
  if (images.length > 0) {
    return (
      <div className="grid grid-cols-2 gap-4 p-4 overflow-none">
        {images.map((image, idx) => (
          <div className="relative" key={idx} onClick={() => onClick(image)}>
            <Image
              className="rounded-xl select-none	absolute"
              src={image.url}
              alt={image.title}
              width={320}
              height={448}
              layout="responsive"
              objectFit="cover"
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNksAUAAEMAP+W2QeMAAAAASUVORK5CYII="
            />
            <div className="text-white text-sm">{image.title}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="w-full h-full text-white flex flex-col justify-center items-center">
      <div>Get Swiping!</div>
      <div className="text-gray-400">
        Your liked images will be displayed here
      </div>
    </div>
  );
};

export default LikedImages;
