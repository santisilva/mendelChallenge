import {apiClient} from '../../api';

export const getAuthor = async (authorName: string) => {
  try {
    const response = await apiClient.get(`${authorName}.json`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
