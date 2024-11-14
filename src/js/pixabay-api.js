import axios, { Axios } from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '46935717-685ea9342bebfa50d29cf3184';

export default async function fetchData(query, page, perPage) {
  const { data } = await axios.get(`${BASE_URL}`, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: perPage,
    },
  });
  return data;
}
