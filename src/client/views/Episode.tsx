import cn from 'classnames';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { BackgroundImageShow } from '../components/BackgroundImageShow';
import { EpisodeInfo } from '../components/EpisodeInfo';
import { EpisodeInfoSkeleton } from '../components/EpisodeInfoSkeleton';
import { PageHeader } from '../components/PageHeader';
import { SubscribeButton } from '../components/SubscribeButton';
import { episodeActions } from '../redux/episode';
import { RootState } from '../redux/store';
import { Error } from './Error';

interface Params {
  id: string;
}
type Props = RouteComponentProps<Params>;

export function Episode({ match }: Props): ReactElement {
  const id = parseInt(match.params.id, 10);
  const dispatch = useDispatch();
  const episode = useSelector((state: RootState) => state.episode);

  useEffect(() => {
    dispatch(episodeActions.get(id));
  }, [dispatch, id]);

  if (episode.status === 'error') {
    return <Error error={episode.error} />;
  }

  if (!episode.data) {
    return (
      <>
        <PageHeader isLoading title="Loading.." />
        <EpisodeInfoSkeleton />
      </>
    );
  }

  return (
    <BackgroundImageShow imageURL={episode.data.show.imageOriginal}>
      <PageHeader
        className={cn(
          'p-2',
          'fixed',
          'top-0',
          'text-gray-100',
          'bg-gray-100 dark:bg-gray-700',
          'bg-opacity-30 dark:bg-opacity-80'
        )}
        rightElement={<SubscribeButton showID={episode.data.show.id} />}
        title={episode.data.show.name}
        titleLink={`/show/${episode.data.show.id}`}
      />
      <EpisodeInfo episode={episode.data} />
    </BackgroundImageShow>
  );
}
