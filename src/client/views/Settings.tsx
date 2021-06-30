import cn from 'classnames';
import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';

import packageJson from '../../../package.json';
import { PageHeader } from '../components/PageHeader';
import { Preferences } from '../components/Preferences';
import { SettingsCard } from '../components/SettingsCard';
import { SettingsCardRow } from '../components/SettingsCardRow';
import { RootState } from '../redux/store';

export function Settings(): ReactElement {
  const user = useSelector((state: RootState) => state.user);

  return (
    <>
      <PageHeader title="Settings" />

      <SettingsCard title="Account Information">
        <SettingsCardRow>
          <span>Email:</span>
          <span>{user.data?.email}</span>
        </SettingsCardRow>

        <SettingsCardRow>
          <span>Date Registered:</span>
          <span>{user.data?.dateCreated}</span>
        </SettingsCardRow>
      </SettingsCard>
      <SettingsCard title="Preferences">
        <Preferences />
      </SettingsCard>
      <SettingsCard title="Other">
        <a
          className={cn('block')}
          download={process.env.SERVER_URL + 'user/data'}
          href={process.env.SERVER_URL + 'user/data'}
        >
          Download your data.
        </a>
        <a
          className={cn('block', 'mt-4')}
          href={process.env.SERVER_URL + 'auth/logout'}
        >
          Logout.
        </a>
        <div className={cn('mt-4', 'font-light', 'text-sm')}>
          Version: {packageJson.version}
        </div>
      </SettingsCard>
    </>
  );
}
