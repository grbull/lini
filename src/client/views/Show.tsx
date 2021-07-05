import cn from 'classnames';
import React, { ReactElement, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';

import { BackgroundImageShow } from '../components/BackgroundImageShow';
import { PageHeader } from '../components/PageHeader';
import { ShowInfo } from '../components/ShowInfo';
import { ShowInfoSkeleton } from '../components/ShowInfoSkeleton';
import { SubscribeButton } from '../components/SubscribeButton';
import { showActions } from '../redux/show';
import { RootState } from '../redux/store';
import { Error } from './Error';

interface Params {
  id: string;
}
type Props = RouteComponentProps<Params>;

export function Show({ match }: Props): ReactElement {
  const id = parseInt(match.params.id, 10);
  const dispatch = useDispatch();
  const show = useSelector((state: RootState) => state.show);

  useEffect(() => {
    dispatch(showActions.get(id));
  }, [dispatch, id]);

  if (show.status === 'error') {
    return <Error error={show.error} />;
  }

  if (!show.data) {
    return (
      <>
        <PageHeader isLoading title="Loading.." />
        <ShowInfoSkeleton />
      </>
    );
  }

  return (
    <BackgroundImageShow imageURL={show.data.imageOriginal}>
      <PageHeader
        className={cn(
          'p-2',
          'fixed',
          'top-0',
          'text-gray-100',
          'bg-gray-100 dark:bg-gray-700',
          'bg-opacity-30 dark:bg-opacity-80'
        )}
        rightElement={<SubscribeButton showID={show.data.id} />}
        title={show.data.name}
      />
      <ShowInfo show={show.data} />
    </BackgroundImageShow>
  );
}
