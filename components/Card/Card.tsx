import Image from 'next/image';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimation } from 'framer-motion';

import styles from './Card.module.css';

interface CardProps {
  url: string;
  title: string;
  date: string;
}

const Card = ({ url, title, date, onVote, id, ...props }: CardProps) => {
  const cardElem = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState(0);
  const [rotation, setRotation] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const unsub = x.onChange((latestX) => {
      console.log(cardElem.current.getBoundingClientRect());
      console.log(
        (cardElem.current.getBoundingClientRect().right +
          cardElem.current.getBoundingClientRect().left) /
          2
      );
    });
  });

  const handleOnDragEnd = (event, info) => {
    const velocity = info.velocity.x;
    const direction = 0 < velocity ? 1 : velocity < 0 ? -1 : undefined;
    if (direction && Math.abs(velocity) > 500) {
      setDirection(direction);
      onVote(direction);
    }
  };

  return (
    <motion.div
      className={`bg-white shadow-md rounded-xl absolute ${styles.card}`}
      ref={cardElem}
      style={{ x }}
      dragSnapToOrigin
      onDragEnd={handleOnDragEnd}
      dragElastic={0.1}
      transition={{ ease: 'easeOut' }}
      exit={{ x: direction * 1200 }}
      {...props}
    >
      <Image
        className="rounded-xl"
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
    </motion.div>
  );
};

export default Card;
