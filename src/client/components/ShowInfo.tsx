import cn from 'classnames';
import React, { ReactElement } from 'react';

import { ShowWithEpisodesDto } from '../../server/show/show.dto';
import { imageShow } from '../utils/imageShow';
import { EpisodeAccordion } from './EpisodeAccordion';
import { InfoCard } from './InfoCard';

interface Props {
  show: ShowWithEpisodesDto;
}

export function ShowInfo({ show }: Props): ReactElement {
  return (
    <>
      <InfoCard className={cn('my-0')}>
        <img
          alt={show.name}
          className={cn('w-1/3', 'float-left', 'mr-2.5')}
          src={imageShow(show.imageOriginal)}
        />
        <div className={cn()}>{show.summary}</div>
      </InfoCard>

      <InfoCard>
        <h2 className={cn('text-xl')}>Show Info</h2>
        <ul>
          <li className={cn('mt-2')}>
            <b>Network</b>: {show.network?.name ?? show.webChannel?.name}
          </li>
          <li className={cn('mt-0.5')}>
            <b>Schedule</b>:{' '}
            {show.scheduleDays.length > 0 ? (
              <span>
                {show.scheduleDays.map((day) => day + 's').join(', ')}
                {show.scheduleTime && (
                  <span> at {show.scheduleTime?.substr(0, 5)}</span>
                )}
                {show.runtime && <span> ({show.runtime} min)</span>}
              </span>
            ) : (
              'N/A'
            )}
          </li>
          <li className={cn('mt-0.5')}>
            <b>Status</b>: {show.status}
          </li>
          <li className={cn('mt-0.5')}>
            <b>Show type</b>: {show.type}
          </li>
          <li className={cn('mt-0.5')}>
            <b>Genres</b>: {show.genres.join(', ')}
          </li>
          <li className={cn('mt-3')}>
            <b>Official site</b>:{' '}
            {show.officialSite ? (
              <span>
                <a href={show.officialSite}>
                  {new URL(show.officialSite).hostname}
                </a>
              </span>
            ) : (
              'N/A'
            )}
          </li>

          <li className={cn('mt-3')}>
            <b>Rating</b>: {show.rating ?? 'N/A'}
          </li>
        </ul>
      </InfoCard>
      <InfoCard>
        <EpisodeAccordion episodes={show.episodes} />
      </InfoCard>
    </>
  );
}
