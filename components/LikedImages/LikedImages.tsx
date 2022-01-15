import React from 'react';
import Image from 'next/image';
import styles from './LikedImages.module.css';

interface LikedImagesProps {
  images: APODImage[];
  onClick: (image: APODImage) => void;
  onUnlikeImage: (idx: number) => void;
}

const LikedImages = ({ images, onClick, onUnlikeImage }: LikedImagesProps) => {
  if (images.length > 0) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 p-4 overflow-none">
        {images.map((image, idx) => (
          <div key={idx}>
            <div className="relative">
              <div className={`w-full ${styles.likedImage}`}>
                <Image
                  onClick={(event) => {
                    if (event.target !== event.currentTarget) return;
                    onClick(image);
                  }}
                  className="rounded-xl select-none	absolute"
                  src={image.url}
                  alt={image.title}
                  layout="fill"
                  objectFit="cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNksAUAAEMAP+W2QeMAAAAASUVORK5CYII="
                />
                <button
                  className="z-20 text-red-50 absolute p-1"
                  onClick={(event) => {
                    onUnlikeImage(idx);
                  }}
                >
                  <Image
                    src="/heart-dislike-circle.svg"
                    layout="fixed"
                    width={24}
                    height={24}
                    alt="unlike"
                  />
                </button>
              </div>
            </div>

            <div className="text-white text-sm">{image.title}</div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="text-white flex flex-col justify-center items-center pt-6">
      <div className="text-lg">Get Swiping!</div>
      <div className="text-gray-400 text-center">
        Your liked images will be displayed here
      </div>
    </div>
  );
};

export default LikedImages;
