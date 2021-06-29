import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import { ShowDto } from '../../server/show/show.dto';
import { imageShow } from '../utils/imageShow';
import { FixedImage } from './FixedImage';
interface Props {
  shows: ShowDto[];
}

export function ShowGrid({ shows }: Props): ReactElement {
  if (shows.length === 0) {
    return <p className={cn('px-2')}>No results to display.</p>;
  }
  return (
    <div className={cn('flex', 'flex-row', 'flex-wrap', 'px-2')}>
      {shows.map((show) => (
        <div className={cn('w-1/3 sm:w-1/4 md:w-1/5', 'p-1')} key={show.id}>
          <Link
            className={cn(
              'flex',
              'flex-col',
              'bg-gray-200 dark:bg-gray-800',
              'h-full',
              'border-b-2',
              'border-solid',
              { 'border-green-500': show.status === 'Running' },
              { 'border-yellow-500': show.status === 'To Be Determined' },
              { 'border-yellow-500': show.status === 'In Development' },
              { 'border-red-500': show.status === 'Ended' }
            )}
            to={`/show/${show.id}`}
          >
            <FixedImage
              alt={show.name}
              fullHeight={295}
              fullWidth={210}
              skeletonClassName={cn('bg-gray-800')}
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
