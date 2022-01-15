import axios from 'axios';
import { NASA_API_KEY } from '../config';

/**
 * GET request NASA's APOD API for Astronomy photos of the day
 * @param count number of images to get
 * @returns array of APODImages
 */
export const getPhotosOfTheDay = async (count: number) => {
  const res = await axios.get(
    `https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}&count=${count}&thumbs=true`
  );

  const images = res.data.filter((img: APODImage) => {
    return img.media_type === 'image';
  });

  return images;
};
