import React from 'react';
import Image from 'next/image';
import Card from '../Card';

interface LikedImagesProps {
  images: APODImage[];
}

const LikedImages = ({ images }: LikedImagesProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      {images.map((image, idx) => (
        <Card key={idx} title={image.title} date={image.date} url={image.url} />
      ))}
    </div>
  );
};

export default LikedImages;
