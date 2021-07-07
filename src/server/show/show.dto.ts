import { EpisodeDto } from '../episode/episode.dto';
import { NetworkDto } from '../network/network.dto';
import { DayOfWeek } from '../tvmaze/tvmaze.types';
import { WebChannelDto } from '../web_channel/web_channel.dto';

export class ShowDto {
  id!: number;
  name!: string;
  type!: string;
  language!: string | null;
  genres!: string[];
  status!: string;
  runtime!: number | null;
  runtimeAverage!: number | null;
  datePremiered!: string | null;
  officialSite!: string | null;
  scheduleTime!: string | null;
  scheduleDays!: (keyof typeof DayOfWeek)[];
  rating!: number | null;
  network!: NetworkDto | null;
  webChannel!: WebChannelDto | null;
  imageMedium!: string | null;
  imageOriginal!: string | null;
  summary!: string | null;
}

export class ShowWithEpisodesDto extends ShowDto {
  episodes!: EpisodeDto[];
}
