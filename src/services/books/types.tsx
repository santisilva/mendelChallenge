export interface SearchResponse {
  numFound: number;
  numFoundExact: boolean;
  num_found: number;
  offset: null;
  q: string;
  start: number;
  docs: Book[];
}

export interface Book {
  author_alternative_name: string[];
  author_facet: string[];
  author_key: string[];
  author_name: string[];
  cover_edition_key: string;
  cover_i: number;
  ebook_access: string;
  ebook_count_i: number;
  edition_count: number;
  edition_key: string[];
  first_publish_year: number;
  has_fulltext: boolean;
  ia: string[];
  ia_collection: string[];
  ia_collection_s: string;
  key: string;
  language: string[];
  last_modified_i: number;
  lcc: string[];
  lcc_sort: string;
  lccn: string[];
  lending_edition_s: string;
  lending_identifier_s: string;
  number_of_pages_median: number;
  oclc: string[];
  printdisabled_s: string;
  public_scan_b: boolean;
  publish_date: string[];
  publish_place: string[];
  publish_year: number[];
  publisher: string[];
  publisher_facet: string[];
  seed: string[];
  subject: string[];
  subject_facet: string[];
  subject_key: string[];
  subtitle: string;
  title: string;
  title_sort: string;
  title_suggest: string;
  type: string;
}
export type PartialBook = Pick<
  Book,
  'title' | 'author_name' | 'first_publish_year' | 'key' | 'cover_i'
>;

export interface InfoSearchNeeded {
  numFound: number;
  start: number;
  docs: PartialBook[];
}
interface Author {
  author: {
    key: string;
  };
  type: {
    key: string;
  };
}

interface Created {
  type: string;
  value: string;
}

interface Type {
  key: string;
}

export interface BookDetails {
  authors: Author[];
  covers: number[];
  created: Created;
  description?: string;
  first_publish_date: string;
  key: string;
  last_modified: Created;
  latest_revision: number;
  revision: number;
  subject_people: string[];
  subject_places: string[];
  subject_times: string[];
  subjects: string[];
  title: string;
  type: Type;
}

export type BookDetailsRequired = Pick<BookDetails, 'authors' | 'description'>;
