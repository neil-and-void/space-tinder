import Head from 'next/head';
import { useState, useRef, useEffect, createRef, ElementRef } from 'react';

import Card from '../components/Card';
import styles from '../styles/Home.module.css';
import CircularButton from '../components/CircularButton';
import { getPhotosOfTheDay } from '../services/photoOfTheDay';
import { AnimatePresence, PanInfo } from 'framer-motion';
import Image from 'next/image';
import LikedImages from '../components/LikedImages';
import Draggable from '../components/Draggable';
import Modal from '../components/Modal';
import ImageInfo from '../components/ImageInfo';

interface HomeProps {
  images: APODImage[];
}

export default function Home({ images }: HomeProps) {
  const [imageQueue, setImageQueue] = useState<APODImage[]>(images);
  const [likedImages, setLikedImages] = useState<APODImage[]>([]);
  const [modalImage, setModalImage] = useState<APODImage | null>(null);
  const elementsRef = useRef(imageQueue.map(() => createRef()));
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // fetch more photos once image queue has been swiped through
    const getMorePhotosOfTheDay = async () => {
      if (imageQueue.length === 0) {
        setLoading(true);
        const photos = await getPhotosOfTheDay(10);
        setImageQueue(photos);
        setLoading(false);
      }
    };

    getMorePhotosOfTheDay();
  }, [imageQueue]);

  /**
   * Vote on the image
   * @param result the vote cast on the image
   */
  const handleVote = (result: number) => {
    const newImageQueue: APODImage[] = [...imageQueue];
    const popped: APODImage | undefined = newImageQueue.pop();
    if (popped && result === 1) {
      setLikedImages([...likedImages, popped]);
    }
    setImageQueue(newImageQueue);
  };

  /**
   *
   * @param event The drag event
   * @param info metadata on the drag event
   */
  const handleOnDragEnd = (event: PointerEvent, info: PanInfo) => {
    const velocity = info.velocity.x;
    const direction = 0 < velocity ? 1 : velocity < 0 ? -1 : undefined;
    if (direction && Math.abs(velocity) > 500) {
      handleVote(direction);
    }
  };

  /**
   * programmatically swipe card
   */
  const swipeTopCard = (direction: number) => {
    const topCardRef = elementsRef.current[imageQueue.length - 1];
    topCardRef.current.swipe(direction);
  };

  /**
   * View image info on modal
   * @param image image to view info on
   */
  const viewDescription = (image: APODImage) => {
    setModalImage(image);
    setShowModal(true);
  };

  /**
   * unlike a liked image
   * @param idx index of the photo to unlike
   */
  const unlikeImage = (idx: number) => {
    const newLikedImages = [...likedImages];
    newLikedImages.splice(idx, 1);
    setLikedImages(newLikedImages);
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <Head>
        <title>SpaceTinder</title>
      </Head>
      <div className="h-full bg-slate-700 z-10 w-1/3 shadow-xl overflow-y-scroll px-3">
        <h1 className="p-3 text-center xl:text-left text-3xl text-white font-bold">
          Liked Images
        </h1>
        <LikedImages
          onClick={viewDescription}
          onUnlikeImage={unlikeImage}
          images={likedImages}
        />
      </div>
      <div className="h-full w-full bg-slate-800 flex flex-col justify-center">
        <div className="w-full text-center p-3">
          <h1 className="text-2xl text-white font-normal">
            SpaceTinder &#128640;
          </h1>
        </div>
        <div className="w-full grow flex justify-center items-center">
          <div className="w-full">
            <div
              className={`w-full h-full flex relative justify-center items-center ${styles.imageQueue}`}
            >
              <AnimatePresence>
                {imageQueue.length ? (
                  imageQueue.map((imageData, idx) => {
                    return (
                      <Draggable
                        ref={elementsRef.current[idx]}
                        key={imageData.title}
                        drag={idx === imageQueue.length - 1}
                        onDragEnd={handleOnDragEnd}
                        onVote={handleVote}
                      >
                        <Card
                          title={imageData.title}
                          date={imageData.date}
                          url={imageData.url}
                          onInfoClick={() => viewDescription(imageData)}
                        />
                      </Draggable>
                    );
                  })
                ) : loading ? (
                  <div className="w-full flex justify-center">
                    <Image
                      src="/loading.svg"
                      width={128}
                      height={64}
                      alt="loading"
                    />
                  </div>
                ) : (
                  <div>Could not find any images</div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex w-full pt-6 justify-center relative">
              <div className="pr-3">
                <CircularButton
                  disabled={loading}
                  onClick={() => {
                    swipeTopCard(-1);
                  }}
                >
                  <Image src="/skip.svg" alt="like" height={32} width={32} />
                </CircularButton>
              </div>
              <div className="pl-3">
                <CircularButton
                  disabled={loading}
                  onClick={() => {
                    swipeTopCard(1);
                  }}
                >
                  <Image src="/heart.svg" alt="like" height={32} width={32} />
                </CircularButton>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal onClose={() => setShowModal(false)} show={showModal}>
        <ImageInfo
          image={modalImage}
          onClose={() => {
            setShowModal(false);
          }}
        />
      </Modal>
    </div>
  );
}

export async function getServerSideProps() {
  const photos = await getPhotosOfTheDay(10);

  return { props: { images: photos } };
}
