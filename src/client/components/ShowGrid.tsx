import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ShowDto } from '../../server/show/show.dto';
import { imageShow } from '../utils/imageShow';

interface Props {
  shows: ShowDto[];
}

// TODO: Min height, so things don't change very much when images are loading
// I assume it needs to be % for responisive
// Problem making the title/rating div use all available space.

export function ShowGrid({ shows }: Props): ReactElement {
  return (
    <div className={cn('flex', 'flex-row', 'flex-wrap', 'px-2')}>
      {shows.map((show) => (
        <div className={cn('w-1/3', 'p-1')} key={show.id}>
          <Link
            className={cn(
              'flex',
              'flex-col',
              'bg-gray-200 dark:bg-gray-800',
              'h-full',
              'border-b-2',
              'border-solid',
              { 'border-green-500': show.status === 'Running' },
              {
                'border-yellow-500':
                  show.status === 'To Be Determined' ||
                  show.status === 'In Development',
              },
              { 'border-red-500': show.status === 'Ended' }
            )}
            to={`/show/${show.id}`}
          >
            <img
              alt={show.name}
              className={cn('w-full')}
              src={imageShow(show.imageMedium)}
            />
            <div
              className={cn(
                'min-h-16',
                'flex-grow',
                'flex',
                'flex-col',
                'justify-around',
                'items-center',
                'p-2'
              )}
            >
              <p className={cn('text-center')}>{show.name}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
