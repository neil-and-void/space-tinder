import axios from 'axios';
import { NASA_API_KEY } from '../config';

export const getPhotosOfTheDay = async (count: number) => {
  const res = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}&thumbs=true`
  );
  return res.data;
};
