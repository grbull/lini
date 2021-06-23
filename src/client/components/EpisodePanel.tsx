import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { dateFromNow } from '../utils/date';
import { formatEpisodeCode } from '../utils/formatEpisodeCode';
import { imageShow } from '../utils/imageShow';
import { EpisodePanelImage } from './EpisodePanelImage';

interface Props {
  episodes: EpisodeDto[];
}

export function EpisodePanel({ episodes }: Props): ReactElement {
  return (
    <div
      className={cn('w-full', 'overflow-x-auto', 'whitespace-nowrap', 'px-1')}
    >
      {episodes.map((episode) => (
        <Link
          className={cn('inline-block', 'w-1/3', 'p-1')}
          key={episode.id}
          to={`/episode/${episode.id}`}
        >
          <EpisodePanelImage
            alt={episode.show.name}
            imageURL={imageShow(episode.show.imageMedium)}
          />
          <div className={cn('h-18')}>
            <span
              className={cn(
                'block',
                'whitespace-nowrap',
                'overflow-hidden',
                'overflow-ellipsis',
                'font-bold',
                'mt-1'
              )}
            >
              {episode.show.name}
            </span>
            <span className={cn('block')}>
              {formatEpisodeCode(episode.season, episode.number)}
            </span>
            <time className={cn('block')} dateTime={episode.airstamp}>
              {episode.airstamp ? dateFromNow(episode.airstamp) : 'N/A'}
            </time>
          </div>
        </Link>
      ))}
    </div>
  );
}
