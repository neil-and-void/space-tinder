import Image from 'next/image';
import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import styles from './Card.module.css';

interface CardProps {
  url: string;
  title: string;
  date: string;
}

const Card = ({ url, title, date, ...props }: CardProps) => {
  return (
    <div className={`relative ${styles.card}`}>
      <Image
        className="rounded-xl select-none	"
        alt={title}
        src={url}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNksAUAAEMAP+W2QeMAAAAASUVORK5CYII="
      />
      <div className="h-full w-full relative">
        <div className="absolute bottom-0	p-3 text-white">
          <h1 className="font-semibold text-lg">{title}</h1>
          <div className="font-extralight">{date}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
