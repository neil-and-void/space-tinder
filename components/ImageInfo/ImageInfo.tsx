import React from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

interface ImageInfoProps {
  image: APODImage;
}

const ImageInfo = ({ image }: ImageInfoProps) => {
  return (
    <motion.div
      initial={{ y: 1000 }}
      animate={{ y: 0 }}
      transition={{ ease: 'anticipate', duration: 0.75 }}
      className=" w-2/3 xl:w-1/3 h-4/5 relative flex flex-col"
    >
      <Image
        className="rounded-t-xl"
        src={image.url}
        alt={image.title}
        layout="responsive"
        objectFit="cover"
        height={300}
        width={400}
      />
      <div className="bg-white p-3 rounded-b-xl shadow-lg grow">
        <div className="text-lg font-semibold">{image.title}</div>
        <div className="text-neutral-600">{image.date}</div>
        <div className="pt-3">{image.explanation}</div>
      </div>
    </motion.div>
  );
};

export default ImageInfo;
