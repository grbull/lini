import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router';

interface Props {
  className?: string;
}

export function BackButton({ className }: Props): ReactElement {
  const history = useHistory();

  function handleClick(): void {
    history.goBack();
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      className={cn('w-11', 'float-left', className)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
    >
      <FontAwesomeIcon className={cn('m-1', 'text-lg')} icon={faArrowLeft} />
    </div>
  );
}

BackButton.defaultProps = { className: undefined };
