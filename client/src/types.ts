export interface LoginPageProps {
  handleIsAuth: () => void;
}

export interface NavbarProps {
  isAuth: boolean;
  handleLogout: () => void;
}

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieListProps {
  movies: Movie[];
  notFound: boolean;
}

export interface MovieCardProps {
  movie: Movie;
}

export interface PageControlProps {
  currentPage: number;
  totalPages: number | undefined;
  handlePageChange: (pageNumber: number) => void;
}

export interface SearchControlProps {
  onInputChange: (e: ChangeEventType) => void;
  onTypeChange: (e: ChangeEventType) => void;
  onYearChange: (e: ChangeEventType) => void;
}

export type ChangeEventType =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLSelectElement>;

export interface MakeRequestType {
  movie: string;
  page: number;
  year: string;
  type: string;
}
