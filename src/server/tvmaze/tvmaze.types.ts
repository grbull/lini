export enum DayOfWeek {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday',
}

interface Schedule {
  time: string;
  days: (keyof typeof DayOfWeek)[];
}

interface Rating {
  average: number | null;
}

export interface TvMazeCountry {
  name: string;
  code: string;
  timezone: string;
}

export interface TvMazeNetwork {
  id: number;
  name: string;
  country: TvMazeCountry;
}

export interface TvMazeWebChannel {
  id: number;
  name: string;
  country: TvMazeCountry | null;
}

interface Externals {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
}

interface Image {
  medium: string;
  original: string;
}

interface Self {
  href: string;
}

interface Previousepisode {
  href: string;
}

interface Nextepisode {
  href: string;
}

interface LinksShow {
  self: Self;
  previousepisode: Previousepisode;
  nextepisode?: Nextepisode;
}

interface LinksEpisode {
  self: Self;
}

// Series/Show endpoints
export interface TvMazeShow {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string | null;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: TvMazeNetwork | null;
  webChannel: TvMazeWebChannel | null;
  dvdCountry: unknown | null;
  externals: Externals;
  image: Image | null;
  summary: string | null;
  updated: number;
  _links: LinksShow;
}

export interface TvMazeShowEmbedded extends TvMazeShow {
  _embedded: {
    episodes: TvMazeEpisode[];
  };
}

export interface TvMazeEpisode {
  id: number;
  url: string;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string; // Can sometimes return ""
  airtime: string; // Can sometimes return ""
  airstamp: string;
  runtime: number;
  image: Image | null;
  summary: string | null;
  _links: LinksEpisode;
}

export interface TvMazeUpdates {
  [id: string]: number;
}
