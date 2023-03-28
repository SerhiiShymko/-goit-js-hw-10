import axios from 'axios';

export const getImages = (search, page) => {
  const params = new URLSearchParams({
    q: search,
    apiKey: process.env.PIXABAY_API_KEY,
    image_type: photo,
    orientation: horizontal,
    safesearch: true,
    page,
    per_page: 40,
  });
  return fetch(`https://pixabay.com/api/?${params}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
};

