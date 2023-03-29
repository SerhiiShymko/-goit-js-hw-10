import axios from 'axios';

export const getImages = (search, page) => {
  const BASE_URL = `https://pixabay.com/api/`;
  const params = new URLSearchParams({
    q: search,
    key: '34798560-686184bc87076e66494c7fccc',
    image_type: photo,
    orientation: horizontal,
    safesearch: true,
    page,
    per_page: 40,
  });
  // return fetch(`${BASE_URL}?${params}`).then(response => {
  //   if (!response.ok) {
  //     throw new Error(response.status);
  //   }
  //   return response.json();
  // });
  return await axios.get(`${BASE_URL}${params}`).then(response => response.data);
};
