import { EpisodeEntity } from '../episode/episode.entity';
import { ShowEntity } from '../show/show.entity';
import {
  DayOfWeek,
  TvMazeEpisode,
  TvMazeShow,
  TvMazeShowEmbedded,
} from './tvmaze.types';

export function stripHtml(string: string | null): string | null {
  if (string) {
    return string.replace(/<\/?[^>]+(>|$)/gu, '');
  }
  return null;
}

export function sanitizeUrl(url?: string): string | null {
  if (url) {
    return url.replace('https://static.tvmaze.com', '');
  }
  return null;
}

export function isValidTime(time: string): boolean {
  const regex = /^[0-23]{2}:[0-59]{2}$/;
  return Boolean(time.match(regex));
}

export function TvMazeShowToEntity(
  show: TvMazeShow | TvMazeShowEmbedded,
  network: number | null,
  webChannel: number | null
): Omit<
  ShowEntity,
  'dateCreated' | 'dateUpdated' | 'episodes' | 'isSeeded' | 'subscriptions'
> {
  return {
    id: show.id,
    name: show.name,
    type: show.type,
    language: show.language || null,
    genres: show.genres,
    status: show.status,
    runtime: show.runtime || null,
    runtimeAverage: show.averageRuntime || null,
    datePremiered: show.premiered || null,
    officialSite: show.officialSite || null,
    scheduleTime: isValidTime(show.schedule.time) ? show.schedule.time : null,
    scheduleDays: show.schedule.days.map((day) => DayOfWeek[day]),
    rating: show.rating.average || null,
    weight: show.weight,
    network,
    webChannel,
    tvrage: show.externals.tvrage || null,
    thetvdb: show.externals.thetvdb || null,
    imdb: show.externals.imdb || null,
    imageMedium: sanitizeUrl(show.image?.medium),
    imageOriginal: sanitizeUrl(show.image?.original),
    summary: stripHtml(show.summary),
  };
}

export function tvMazeEpisodeToEntity(
  episode: TvMazeEpisode,
  showId: number
): EpisodeEntity {
  return {
    id: episode.id.toString(),
    name: episode.name,
    season: episode.season,
    number: episode.number,
    type: episode.type,
    airdate: episode.airdate.length !== 0 ? episode.airdate : null,
    airtime: isValidTime(episode.airtime) ? episode.airtime : null,
    airstamp: episode.airstamp,
    runtime: episode.runtime,
    imageMedium: sanitizeUrl(episode.image?.medium),
    imageOriginal: sanitizeUrl(episode.image?.original),
    summary: stripHtml(episode.summary),
    show: showId,
  };
}
