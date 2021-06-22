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
  const { profile } = useSelector((state: RootState) => state.user);

  return (
    <>
      <PageHeader title="Settings" />

      <SettingsCard title="Account Information">
        <SettingsCardRow>
          <span>Email:</span>
          <span>{profile?.email}</span>
        </SettingsCardRow>

        <SettingsCardRow>
          <span>Date Registered:</span>
          <span>{profile?.dateCreated}</span>
        </SettingsCardRow>
      </SettingsCard>
      <SettingsCard title="Preferences">
        <Preferences />
      </SettingsCard>
      <SettingsCard title="Other">
        <a href={process.env.SERVER_URL + 'auth/logout'}>Logout</a>
        <div className={cn('mt-4', 'font-light', 'text-sm')}>
          Version: {packageJson.version}
        </div>
      </SettingsCard>
    </>
  );
}
