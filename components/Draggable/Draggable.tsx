import {
  ReactNode,
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  ForwardRefRenderFunction,
} from 'react';
import {
  motion,
  useMotionValue,
  useTransform,
  useAnimation,
  PanInfo,
} from 'framer-motion';

interface DraggableProps {
  children: ReactNode;
  onVote: (number: number) => void;
  onDragEnd: (event: PointerEvent, info: PanInfo) => void;
}

interface DraggableHandle {
  swipe: (direction: number) => void;
}

const Draggable: ForwardRefRenderFunction<DraggableHandle, DraggableProps> = (
  { onVote, children, onDragEnd, ...props },
  ref
) => {
  const x = useMotionValue(0);
  const controls = useAnimation();
  const xRange = [-1000, -1, 1, 1000];
  const rotateRange = [-45, 0, 0, 45];
  const rotate = useTransform(x, xRange, rotateRange);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const unSub = x.onChange((latestX) => {
      if (0 < latestX) {
        setDirection(1);
      } else if (latestX < 0) {
        setDirection(-1);
      } else {
        setDirection(0);
      }
    });

    return () => unSub();
  });

  // allow parent to call swipe functions to not couple other components
  useImperativeHandle(ref, () => ({
    swipe: (direction: number) => {
      setDirection(direction);
      onVote(direction);
    },
  }));

  return (
    <motion.div
      className={`bg-white shadow-md rounded-xl absolute`}
      initial={{ x: 0 }}
      animate={controls}
      transition={{ ease: 'easeOut' }}
      style={{ rotate, x }}
      dragSnapToOrigin
      exit={{ x: direction * 1200 }}
      onDragEnd={onDragEnd}
      dragElastic={0.5}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default forwardRef(Draggable);
