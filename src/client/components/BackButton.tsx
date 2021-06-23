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
    <button
      className={cn('w-11', 'float-left', className)}
      onClick={handleClick}
      tabIndex={0}
      type="button"
    >
      <FontAwesomeIcon className={cn('m-1', 'text-lg')} icon={faArrowLeft} />
    </button>
  );
}

BackButton.defaultProps = { className: undefined };
