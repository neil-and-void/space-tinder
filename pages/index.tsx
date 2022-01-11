import axios from 'axios';
import { useState, useRef, useEffect, useCallback, createRef } from 'react';

import Card from '../components/Card';
import styles from '../styles/Home.module.css';
import CircularButton from '../components/CircularButton';
import { getPhotosOfTheDay } from '../services/PhotoOfTheDay';
import { AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LikedImages from '../components/LikedImages';
import CardStack from '../components/CardStack';
import Draggable from '../components/Draggable';

interface HomeProps {
  images: APODImage[];
}

const testData = [
  {
    date: '2002-03-06',
    explanation:
      "Stunningly detailed, this picture is a computer simulated view of a cluster of galaxies in the distant cosmos. A large, elliptical galaxy dominates this hypothetical cluster's central region surrounded by a swarm of member galaxies. Other galaxies which lie far behind the cluster are seen as numerous visible concentric arcs - lensed by the enormous gravitational field dominated by dark matter within the cluster itself. Such magnificent images are expected to be achieved by the Advanced Camera for Surveys (ACS), one of the upgrades being installed on the Hubble Space Telescope during the ongoing servicing mission. Compared to Hubble's workhorse Wide Field Planetary Camera 2 (WFPC2), whose achievements include the current deep field views of the Universe, the new technology ACS will be twice as sharp an imager with twice the field of view and five times the sensitivity.  Along with extended views of the distant cosmos, enthusiastic astronomers also plan to use the ACS to monitor our own Solar System and to search for planets orbiting stars beyond the Sun.",
    hdurl: 'https://apod.nasa.gov/apod/image/0203/simcluster_hubbleACS_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Simulated Galaxy Cluster View',
    url: 'https://apod.nasa.gov/apod/image/0203/simcluster_hubbleACS_c2.jpg',
  },
  {
    date: '2020-06-17',
    explanation:
      "What role do magnetic fields play in interstellar physics?  Analyses of observations by ESA's Planck satellite of emission by small magnetically-aligned dust grains reveal previously unknown magnetic field structures in our Milky Way Galaxy -- as shown by the curvy lines in the featured full-sky image.  The dark red shows the plane of the Milky Way, where the concentration of dust is the highest.  The huge arches above the plane are likely remnants of past explosive events from our Galaxy's core, conceptually similar to magnetic loop-like structures seen in our Sun's atmosphere.  The curvy streamlines align with interstellar filaments of neutral hydrogen gas and provide tantalizing evidence that magnetic fields may supplement gravity in not only in shaping the interstellar medium, but in forming stars.  How magnetism affected our Galaxy's evolution will likely remain a topic of research for years to come.",
    hdurl:
      'https://apod.nasa.gov/apod/image/2006/PolarisedMilkyWay_Planck_2048.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'Magnetic Streamlines of the Milky Way',
    url: 'https://apod.nasa.gov/apod/image/2006/PolarisedMilkyWay_Planck_1080.jpg',
  },
  {
    date: '2000-10-01',
    explanation:
      'A fantastic jumble of young blue star clusters, gigantic glowing gas clouds, and imposing dark dust lanes surrounds the central region of the active galaxy Centaurus A. This mosaic of Hubble Space Telescope images taken in blue, green, and red light has been processed to present a natural color picture of this cosmic maelstrom. Infrared images from the Hubble have also shown that hidden at the center of this activity are what seem to be disks of matter spiraling into a black hole with a billion times the mass of the Sun! Centaurus A itself is apparently the result of a collision of two galaxies and the left over debris is steadily being consumed by the black hole. Astronomers believe that such black hole central engines generate the radio, X-ray, and gamma-ray energy radiated by Centaurus A and other active galaxies. But for an active galaxy Centaurus A is close, a mere 10 million light-years away, and is a relatively convenient laboratory for exploring these powerful sources of energy.',
    hdurl: 'https://apod.nasa.gov/apod/image/0010/CenA_wfpc2_big.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'The Center of Centaurus A',
    url: 'https://apod.nasa.gov/apod/image/0010/CenA_wfpc2.jpg',
  },
  {
    copyright: 'Josep Drudis',
    date: '2017-07-27',
    explanation:
      "These three bright nebulae are often featured on telescopic tours of the constellation Sagittarius and the crowded starfields of the central Milky Way. In fact, 18th century cosmic tourist Charles Messier cataloged two of them; M8, the large nebula above and left of center, and colorful M20 near the bottom of the frame. The third emission region includes NGC 6559, right of M8 and separated from the larger nebula by a dark dust lane. All three are stellar nurseries about five thousand light-years or so distant. Over a hundred light-years across the expansive M8 is also known as the Lagoon Nebula. M20's popular moniker is the Trifid. Glowing hydrogen gas creates the dominant red color of the emission nebulae. In striking contrast, blue hues in the Trifid are due to dust reflected starlight. The colorful composite skyscape was recorded with two different telescopes to capture a widefield image of the area and individual close-ups at higher resolution.",
    hdurl:
      'https://apod.nasa.gov/apod/image/1707/TOA1-M8M20-SL-DCP01andB600-09-Final7-Cc2048.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'A Sagittarius Triplet',
    url: 'https://apod.nasa.gov/apod/image/1707/TOA1-M8M20-SL-DCP01andB600-09-Final7-Cc1024.jpg',
  },
  {
    date: '2021-03-28',
    explanation:
      "A spacesuit floated away from the International Space Station 15 years ago, but no investigation was conducted.  Everyone knew that it was pushed by the space station crew.   Dubbed Suitsat-1, the unneeded Russian Orlan spacesuit filled mostly with old clothes was fitted with a faint radio transmitter and released to orbit the Earth. The suit circled the Earth twice before its radio signal became unexpectedly weak. Suitsat-1 continued to orbit every 90 minutes until it burned up in the Earth's atmosphere after a few weeks.  Pictured, the lifeless spacesuit was photographed in 2006 just as it drifted away from  space station.    Portal Universe: Random APOD Generator",
    hdurl: 'https://apod.nasa.gov/apod/image/2103/suitsat1_nasa_2008.jpg',
    media_type: 'image',
    service_version: 'v1',
    title: 'SuitSat-1: A Spacesuit Floats Free',
    url: 'https://apod.nasa.gov/apod/image/2103/suitsat1_nasa_1080.jpg',
  },
];

export default function Home({ images }: HomeProps) {
  const [cardRef, setTopCardRef] = useState(null);
  const [imageQueue, setImageQueue] = useState<APODImage[]>(testData);
  const [likedImages, setLikedImages] = useState<APODImage[]>(testData);
  const elementsRef = useRef(testData.map(() => createRef()));

  const vote = (result) => {
    const newImageQueue = [...imageQueue];
    const popped = newImageQueue.pop();
    // if (result === 1) {
    //   console.log(popped);
    //   setLikedImages([...likedImages, popped]);
    // }
    setImageQueue(newImageQueue);
  };

  const handleOnDragEnd = (event, info) => {
    const velocity = info.velocity.x;
    const direction = 0 < velocity ? 1 : velocity < 0 ? -1 : undefined;
    if (direction && Math.abs(velocity) > 500) {
      vote(direction);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">
      <div className="bg-slate-700 z-10 w-1/3 shadow-xl">
        <h1 className="text-white text-center">Liked Images</h1>
        <LikedImages images={likedImages} />
      </div>
      <div className="h-full w-full bg-slate-800">
        <div className="h-full w-full flex justify-center items-center">
          <div className="w-full">
            <div
              className={`w-full flex relative justify-center items-center ${styles.imageQueue}`}
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
                        onVote={vote}
                      >
                        <Card
                          title={imageData.title}
                          date={imageData.date}
                          url={imageData.url}
                        />
                      </Draggable>
                    );
                  })
                ) : (
                  <div>Finding more images</div>
                )}
              </AnimatePresence>
            </div>
            <div className="flex w-full pt-6 justify-center relative">
              <div className="pr-1.5">
                <CircularButton
                  onPress={() => {
                    elementsRef.current[
                      imageQueue.length - 1
                    ].current.swipeLeft();
                  }}
                >
                  <Image src="/skip.svg" alt="like" height={32} width={32} />
                </CircularButton>
              </div>
              <div className="px-1.5">
                <CircularButton
                  onPress={() => {
                    elementsRef.current[
                      imageQueue.length - 1
                    ].current.swipeLeft();
                  }}
                >
                  <Image src="/undo.svg" alt="like" height={32} width={32} />
                </CircularButton>
              </div>
              <div className="pl-1.5">
                <CircularButton
                  onPress={() => {
                    elementsRef.current[
                      imageQueue.length - 1
                    ].current.swipeRight();
                  }}
                >
                  <Image src="/heart.svg" alt="like" height={32} width={32} />
                </CircularButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export async function getServerSideProps() {
//   const photos = await getPhotosOfTheDay(5);

//   return { props: { images: photos } };
// }
