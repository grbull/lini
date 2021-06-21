import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { dateFromNow } from '../utils/date';
import { formatEpisodeCode } from '../utils/formatEpisodeCode';
import { imageEpisode } from '../utils/imageEpisode';
import { imageShow } from '../utils/imageShow';

interface Props {
  className?: string;
  episodes: EpisodeDto[];
}

export function ScrollableEpisodePanel({
  className,
  episodes,
}: Props): ReactElement {
  return (
    <div
      className={cn(
        'w-full',
        'overflow-x-auto',
        'whitespace-nowrap',
        'px-1',
        className
      )}
    >
      {episodes.map((episode) => (
        <Link
          className={cn('inline-block', 'w-1/3', 'p-1')}
          key={episode.id}
          to={`/episode/${episode.id}`}
        >
          <img
            alt={episode.show.name}
            className={cn('rounded-sm')}
            src={imageShow(episode.show.imageMedium)}
          />
          <span
            className={cn(
              'block',
              'whitespace-nowrap',
              'overflow-hidden',
              'overflow-ellipsis',
              'font-bold'
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
        </Link>
      ))}
    </div>
  );
}

ScrollableEpisodePanel.defaultProps = { className: undefined };
