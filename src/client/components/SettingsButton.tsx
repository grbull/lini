import { faCog } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

export function SettingsButton(): ReactElement {
  return (
    <div className={cn('pb-4')}>
      <Link className={cn('float-right')} to="/settings">
        <FontAwesomeIcon className={cn('m-3', 'text-xl')} icon={faCog} />
      </Link>
    </div>
  );
}
