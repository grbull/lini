import { ShowDto } from '../show/show.dto';

export class EpisodeDto {
  id!: string;
  name!: string;
  season!: number;
  number!: number;
  type!: string;
  airdate!: string | null;
  airtime!: string | null;
  airstamp!: string | null;
  runtime!: number | null;
  imageMedium!: string | null;
  imageOriginal!: string | null;
  summary!: string | null;
  show!: ShowDto;
}

export class EpisodeScheduleDto {
  future!: EpisodeDto[];
  past!: EpisodeDto[];
}
