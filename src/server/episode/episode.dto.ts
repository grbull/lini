import { ShowDto } from '../show/show.dto';

export class EpisodeDto {
  id!: string;
  name!: string;
  season!: number;
  number!: number;
  type!: string;
  airdate?: string;
  airtime!: string | null;
  airstamp?: string;
  runtime?: number;
  imageMedium?: string;
  imageOriginal?: string;
  summary?: string;
  show!: ShowDto;
}

export class EpisodeScheduleDto {
  future!: EpisodeDto[];
  past!: EpisodeDto[];
}
