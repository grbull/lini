import React, { ChangeEvent, ReactElement } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { UserUpdateDto } from '../../server/user/user.dto';
import { useNotifications } from '../hooks/useNotifications';
import { RootState } from '../redux/store';
import { userActions } from '../redux/user';
import { PreferencesItem } from './PreferencesItem';
import { Select } from './Select';
import { SettingsCardRow } from './SettingsCardRow';
import { Toggle } from './Toggle';

export function Preferences(): ReactElement {
  const dispatch = useDispatch();
  const { isEnabled, toggle } = useNotifications();
  const { profile } = useSelector((state: RootState) => state.user);

  function handleTheme(event: ChangeEvent<HTMLSelectElement>): void {
    const userUpdateDto: UserUpdateDto = {
      theme: event.target.value as 'auto' | 'light' | 'dark',
      notifications: profile?.notifications || false,
      dataSaving: profile?.dataSaving || false,
    };
    dispatch(userActions.update(userUpdateDto));
  }

  function handleDataSaving(event: ChangeEvent<HTMLInputElement>): void {
    const userUpdateDto: UserUpdateDto = {
      theme: profile?.theme || 'auto',
      notifications: profile?.notifications || false,
      dataSaving: event.target.checked,
    };
    dispatch(userActions.update(userUpdateDto));
  }

  return (
    <>
      <SettingsCardRow>
        <PreferencesItem description="Some description" title="Theme">
          <Select onChange={handleTheme} value={profile?.theme} />
        </PreferencesItem>
      </SettingsCardRow>
      <SettingsCardRow>
        <PreferencesItem
          description="When enabled, displays push notifications regarding soon to be aired episodes."
          title="Notifications"
        >
          <Toggle id="test" onChange={toggle} value={isEnabled} />
        </PreferencesItem>
      </SettingsCardRow>
      <SettingsCardRow>
        <PreferencesItem
          description="Reduces network data usage by using loading lower resolution images."
          title="Data Saving"
        >
          <Toggle
            id="test"
            onChange={handleDataSaving}
            value={profile?.dataSaving || false}
          />
        </PreferencesItem>
      </SettingsCardRow>
    </>
  );
}
