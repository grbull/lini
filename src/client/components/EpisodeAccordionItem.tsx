import cn from 'classnames';
import React, { ReactElement, useRef } from 'react';
import { Link } from 'react-router-dom';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { dateToLocaleDateMed } from '../utils/date';
import { formatEpisodeNumber } from '../utils/formatEpisodeNumber';

interface Props {
  episodes: Omit<EpisodeDto, 'show'>[];
  isExpanded: boolean;
  season: number;
  setExpanded: (row: number) => void;
}

export function EpisodeAccordionItem({
  episodes,
  isExpanded,
  season,
  setExpanded,
}: Props): ReactElement {
  const refEl = useRef<HTMLDivElement>(null);

  function clickHandler(): void {
    if (isExpanded) {
      setExpanded(0);
    } else {
      setExpanded(season);
      refEl.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'end',
      });
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn('py-1')}
      key={season}
      onClick={clickHandler}
      ref={refEl}
      role="button"
      tabIndex={season}
    >
      <div
        className={cn('flex', 'justify-between', 'items-center', {
          'font-bold': isExpanded,
        })}
      >
        <span>Season {season}</span>
        <span>{episodes.length} Episodes</span>
      </div>
      {isExpanded &&
        episodes.map((episode) => (
          <Link
            className={cn(
              'py-1',
              'flex',
              'justify-between',
              'items-center',
              'whitespace-nowrap'
            )}
            key={episode.number}
            to={`/episode/${episode.id}`}
          >
            <span
              className={cn('overflow-hidden', 'overflow-ellipsis', 'pr-2.5')}
            >
              <span className={cn('mr-1', 'text-gray-400')}>
                E{formatEpisodeNumber(episode.number)}
              </span>
              <span>{episode.name}</span>
            </span>
            <span>
              {episode.airstamp ? dateToLocaleDateMed(episode.airstamp) : 'N/A'}
            </span>
          </Link>
        ))}
    </div>
  );
}
