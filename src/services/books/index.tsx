import {apiClient} from '../../api';
import {adapterBookDetails, adapterBookSerch} from './serviceAdapter';

export const searchBooks = async (
  searchedBook: string,
  limit: number,
  page: number,
  options?: object,
) => {
  try {
    const url = `/search.json?q=${searchedBook}&limit=${limit}&page=${page}`;
    const response = await apiClient.get(url, options);
    console.log('RESPONSE', response.data);
    return adapterBookSerch(response.data);
  } catch (error) {
    console.error('error');
    console.error(error);
  }
};

export const getBook = async (bookKey: string) => {
  try {
    const url = `${bookKey}.json`;
    const response = await apiClient.get(url);
    console.log('BOOK ESPECIFICADO', response.data);
    return adapterBookDetails(response.data);
  } catch (error) {
    console.error(error);
  }
};
