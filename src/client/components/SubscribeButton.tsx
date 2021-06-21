import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../redux/store';
import { subscriptionActions } from '../redux/subscription';

interface Props {
  showID: number;
}

export function SubscribeButton({ showID }: Props): ReactElement {
  const dispatch = useDispatch();
  const subscription = useSelector((state: RootState) => state.subscription);

  const isSubscribed = !!subscription.data?.find(
    ({ show }) => show.id === showID
  );

  function clickHandler(): void {
    if (isSubscribed) {
      dispatch(subscriptionActions.remove({ show: showID }));
    } else {
      dispatch(subscriptionActions.create({ show: showID }));
    }
  }

  return (
    <FontAwesomeIcon
      className={cn('float-right', 'm-1', 'text-xl')}
      icon={isSubscribed ? faHeartSolid : faHeartRegular}
      onClick={clickHandler}
      role="button"
    />
  );
}
