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
  const xRotateRange = [-1000, -1, 1, 1000];
  const rotateRange = [-45, 0, 0, 45];
  const rotate = useTransform(x, xRotateRange, rotateRange);
  const xOpacityRange = [-750, -1, 1, 750];
  const opacityRange = [1, 0, 0, 1];
  const opacity = useTransform(x, xOpacityRange, opacityRange);
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

  console.log(direction);

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
      {direction !== 0 ? (
        <motion.div
          className={`h-full w-full rounded-xl ${
            direction > 0 ? 'bg-emerald-500' : 'bg-rose-600'
          } absolute z-20 grid place-items-center`}
          style={{ opacity }}
        >
          <div className="font-semibold text-3xl text-white">
            {direction > 0 ? 'LIKE' : 'NOPE'}
          </div>
        </motion.div>
      ) : null}

      {children}
    </motion.div>
  );
};

export default forwardRef(Draggable);
