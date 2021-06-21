import Axios from 'axios';
import rateLimit from 'axios-rate-limit';

import { TvMazeShow, TvMazeShowEmbedded, TvMazeUpdates } from './tvmaze.types';

const axios = rateLimit(
  Axios.create({
    baseURL: 'https://api.tvmaze.com',
  }),
  { maxRequests: 2, perMilliseconds: 1000 }
);

async function fetchShowsByIndex(page: number): Promise<TvMazeShow[]> {
  const response = await axios.get<TvMazeShow[]>(`/shows?page=${page}`);
  return response.data;
}

async function fetchShowEmbedded(
  seriesId: number
): Promise<TvMazeShowEmbedded> {
  const response = await axios.get<TvMazeShowEmbedded>(
    `/shows/${seriesId}?embed=episodes`
  );
  return response.data;
}

async function fetchShowUpdates(): Promise<TvMazeUpdates> {
  const response = await axios.get<TvMazeUpdates>('/updates/shows');
  return response.data;
}

export const tvMazeApi = {
  fetchShowsByIndex,
  fetchShowEmbedded,
  fetchShowUpdates,
};
