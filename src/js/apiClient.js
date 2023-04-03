import axios from 'axios';

export const getImages = async (value, page) => {
  const BASE_URL = `https://pixabay.com/api/`;
  const KEY = '34798560-686184bc87076e66494c7fccc';
  const params = `?key=${KEY}&q=${value}$&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  return await axios
    .get(`${BASE_URL}${params}`)
    .then(response => response.data);
};
