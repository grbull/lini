import { EpisodeDto } from '../episode/episode.dto';
import { NetworkDto } from '../network/network.dto';
import { DayOfWeek } from '../tvmaze/tvmaze.types';
import { WebChannelDto } from '../web_channel/web_channel.dto';

export class ShowDto {
  id!: number;
  name!: string;
  type!: string;
  language?: string;
  genres!: string[];
  status!: string;
  runtime!: number | null;
  runtimeAverage?: number;
  datePremiered?: string;
  officialSite?: string;
  scheduleTime!: string | null;
  scheduleDays!: (keyof typeof DayOfWeek)[];
  rating?: number;
  network?: NetworkDto;
  webChannel?: WebChannelDto;
  imageMedium?: string;
  imageOriginal?: string;
  summary?: string;
}

export class ShowWithEpisodesDto extends ShowDto {
  episodes!: EpisodeDto[];
}
