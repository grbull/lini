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
  days: DayOfWeek[];
}

interface Rating {
  average?: number;
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
  country?: TvMazeCountry;
}

interface Externals {
  tvrage?: number;
  thetvdb?: number;
  imdb?: string;
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
  nextepisode: Nextepisode;
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
  language?: string;
  genres: string[];
  status: string;
  runtime?: number;
  premiered?: string;
  officialSite?: string;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network?: TvMazeNetwork;
  webChannel?: TvMazeWebChannel;
  dvdCountry?: unknown;
  externals: Externals;
  image?: Image;
  summary: string;
  updated: number;
  _links: LinksShow;
  averageRuntime?: number;
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
  airdate: string;
  airtime: string;
  airstamp: string;
  runtime: number;
  image?: Image;
  summary: string;
  _links: LinksEpisode;
}

export interface TvMazeUpdates {
  [id: string]: number;
}
