import {
  InfoSearchNeeded,
  PartialBook,
  SearchResponse,
  BookDetails,
  BookDetailsRequired,
} from './types';

export const adapterBookSerch = (data: SearchResponse) => {
  const booksFormatted: InfoSearchNeeded = {
    numFound: data?.numFound || 0,
    start: data?.start || 0,
    docs:
      data?.docs.map(book => {
        const bookFormatted: PartialBook = {
          title: book?.title || 'No title',
          author_name: book?.author_name || [],
          first_publish_year: book?.first_publish_year || 0,
          key: book?.key || 'No key',
          cover_i: book?.cover_i || 0,
        };
        return bookFormatted;
      }) || [],
  };

  return booksFormatted;
};
//
export const adapterBookDetails = (data: BookDetails) => {
  const bookFormatted: BookDetailsRequired = {
    authors: data?.authors || [],
    description: data?.description || 'No description',
  };

  return bookFormatted;
};
