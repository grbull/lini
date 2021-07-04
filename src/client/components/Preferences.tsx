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
  const user = useSelector((state: RootState) => state.user);

  function handleTheme(event: ChangeEvent<HTMLSelectElement>): void {
    const userUpdateDto: UserUpdateDto = {
      theme: event.target.value as 'auto' | 'light' | 'dark',
      notifications: user.data?.notifications || false,
    };
    dispatch(userActions.update(userUpdateDto));
  }

  return (
    <>
      <SettingsCardRow>
        <PreferencesItem
          description="When set to auto, the app will use your system setting's to determine the theme."
          title="Theme"
        >
          <Select onChange={handleTheme} value={user.data?.theme} />
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
    </>
  );
}
