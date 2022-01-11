import { useState } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface Props {
  images: APODImage[];
}

const CardStack = ({ images, ...props }: Props) => {
  const [direction, setDirection] = useState(0);

  const x = useMotionValue(0);
  const xRange = [-1000, -1, 1, 1000];
  const rotateRange = [-45, 0, 0, 45];
  const rotate = useTransform(x, xRange, rotateRange);

  const handleOnDragEnd = (event, info) => {
    const velocity = info.velocity.x;
    const direction = 0 < velocity ? 1 : velocity < 0 ? -1 : undefined;
    if (direction && Math.abs(velocity) > 500) {
      setDirection(direction);
      onVote(direction);
    }
  };

  return (
    <AnimatePresence>
      {images.map((image, idx) => (
        <motion.div
          key={idx}
          className={`bg-white shadow-md rounded-xl absolute`}
          initial={{ x: 1000 }}
          animate={{ x: 0 }}
          transition={{ ease: 'easeOut' }}
          exit={{ x: direction * 1200 }}
          style={{ rotate, x }}
          dragSnapToOrigin
          onDragEnd={handleOnDragEnd}
          dragElastic={0.5}
          drag
          {...props}
        >
          <div>slkjdflskdjf</div>
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default CardStack;
