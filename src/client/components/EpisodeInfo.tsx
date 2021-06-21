import cn from 'classnames';
import React, { ReactElement } from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { dateFromNow } from '../utils/date';
import { formatEpisodeCode } from '../utils/formatEpisodeCode';
import { imageEpisode } from '../utils/imageEpisode';
import { InfoCard } from './InfoCard';

interface Props {
  episode: EpisodeDto;
}

export function EpisodeInfo({ episode }: Props): ReactElement {
  return (
    <InfoCard>
      <div className={cn('w-full', 'flex', 'justify-between')}>
        <h2 className={cn('font-bold')}>{episode.name}</h2>
        <p>{formatEpisodeCode(episode.season, episode.number)}</p>
      </div>
      <div className={cn('w-full', 'flex', 'justify-between')}>
        <p>{episode.airstamp ? dateFromNow(episode.airstamp) : 'N/A'}</p>
        <p>{episode.airdate || 'N/A'}</p>
      </div>

      <img
        alt={episode.name}
        className={cn('w-full', 'my-4')}
        src={imageEpisode(episode.imageOriginal)}
      />
      <p className={cn()}>{episode.summary || 'Summary unavailable.'}</p>
    </InfoCard>
  );
}
