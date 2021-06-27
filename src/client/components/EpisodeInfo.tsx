import cn from 'classnames';
import React, { ReactElement } from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { dateToLocaleDate, dateToLocaleTime } from '../utils/date';
import { formatEpisodeCode } from '../utils/formatEpisodeCode';
import { imageEpisode } from '../utils/imageEpisode';
import { FixedImage } from './FixedImage';
import { InfoCard } from './InfoCard';

interface Props {
  episode: EpisodeDto;
}

export function EpisodeInfo({ episode }: Props): ReactElement {
  return (
    <InfoCard>
      <div className={cn('w-full', 'h-6', 'flex', 'justify-between')}>
        <h2 className={cn('font-bold')}>{episode.name}</h2>
        <p>{formatEpisodeCode(episode.season, episode.number)}</p>
      </div>
      <div className={cn('w-full', 'h-6', 'flex', 'justify-between')}>
        <p>{episode.airstamp ? dateToLocaleDate(episode.airstamp) : 'N/A'}</p>
        <p>{episode.airstamp ? dateToLocaleTime(episode.airstamp) : 'N/A'}</p>
      </div>
      <FixedImage
        alt={episode.name}
        className={cn('my-3')}
        fullHeight={1080}
        fullWidth={1920}
        src={imageEpisode(episode.imageOriginal)}
      />
      <p className={cn('min-h-16')}>
        {episode.summary || 'Summary unavailable.'}
      </p>
    </InfoCard>
  );
}
