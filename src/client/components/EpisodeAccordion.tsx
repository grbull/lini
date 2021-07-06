import cn from 'classnames';
import React, { ReactElement, useState } from 'react';

import { EpisodeDto } from '../../server/episode/episode.dto';
import { EpisodeAccordionItem } from './EpisodeAccordionItem';

interface Props {
  episodes: Omit<EpisodeDto, 'show'>[];
}

export function EpisodeAccordion({ episodes }: Props): ReactElement {
  const [expanded, setExpanded] = useState(0);

  const seasons = episodes
    .reduce((seasons: number[], episode) => {
      if (seasons.find((season) => episode.season === season)) {
        return seasons;
      }
      return [...seasons, episode.season];
    }, [])
    .sort((a, b) => a - b);

  return (
    <>
      <h2 className={cn('text-xl', 'mb-2')}>Episode List</h2>

      {seasons.map((season) => (
        <EpisodeAccordionItem
          episodes={episodes.filter((episode) => episode.season === season)}
          isExpanded={expanded === season}
          key={season}
          season={season}
          setExpanded={setExpanded}
        />
      ))}
    </>
  );
}
