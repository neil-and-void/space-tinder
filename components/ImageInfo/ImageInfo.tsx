import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import styles from './ImageInfo.module.css';

interface ImageInfoProps {
  image: APODImage;
  onClose: () => void;
}

const ImageInfo = ({ image, onClose }: ImageInfoProps) => {
  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ ease: 'anticipate', duration: 0.75 }}
      className={`w-2/3 xl:w-1/3 ${styles.imageInfo} relative flex flex-col`}
    >
      <div className="relative h-1/2">
        <button
          className="text-white z-20 absolute right-0 p-3"
          onClick={onClose}
        >
          close
        </button>
        <Image
          className="rounded-t-xl"
          src={image.url}
          alt={image.title}
          layout="fill"
          objectFit="cover"
          height={300}
          width={400}
        />
      </div>
      <div
        className={`bg-white p-3 rounded-b-xl shadow-lg ${styles.imageDescription}`}
      >
        <div className="text-lg font-semibold">{image.title}</div>
        <div className="text-neutral-600">{image.date}</div>
        <div className="pt-3">{image.explanation}</div>
      </div>
    </motion.div>
  );
};

export default ImageInfo;
