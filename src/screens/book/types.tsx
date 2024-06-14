export interface BookDetails {
  title: string;
  author_name: string;
  first_publish_year: number;
  key: string;
}

export type AuthorBio = {
  key: string;
  name: string;
  bio: string;
};

export type RootStackParamList = {
  Book: {
    key: string;
    title: string;
    author_name: string[];
    cover_i: number;
    first_publish_year: number;
  };
};
