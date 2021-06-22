import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { dateToLocaleDate } from '../utils/date';
import { formatEpisodeNumber } from '../utils/formatEpisodeNumber';

interface Props {
  episodes: EpisodeDto[];
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
  function clickHandler(): void {
    setExpanded(isExpanded ? 0 : season);
    // TODO: Scroll to bottom
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn('py-1')}
      key={season}
      onClick={clickHandler}
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
            className={cn('py-1', 'flex', 'justify-between', 'items-center')}
            key={episode.number}
            to={`/episode/${episode.id}`}
          >
            <span>
              <span className={cn('mr-1', 'text-gray-400')}>
                E{formatEpisodeNumber(episode.number)}
              </span>
              <span>{episode.name}</span>
            </span>
            <span>
              {episode.airstamp ? dateToLocaleDate(episode.airstamp) : 'N/A'}
            </span>
          </Link>
        ))}
    </div>
  );
}
