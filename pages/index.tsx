import { useState } from 'react';
import axios from 'axios';
import { NASA_API_KEY } from '../config';
import Card from '../components/Card';
import styles from '../styles/Home.module.css';

export default function Home({ images }) {
  console.log(images);
  const [imageData, setImageData] = useState([]);

  return (
    <div className="flex flex-row h-full">
      <div className="h-screen shadow-lg">Liked</div>
      <div className="h-screen w-full bg-neutral-100 grid place-items-center">
        {}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const res = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=20`
  );

  return { props: { images: res.data } };
}
