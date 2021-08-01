import cn from 'classnames';
import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  value?: 'auto' | 'light' | 'dark';
}

export function Select({ onChange, value }: Props): ReactElement {
  return (
    <select
      aria-label="theme-select"
      className={cn('bg-gray-200 dark:bg-gray-500', 'py-1', 'rounded')}
      defaultValue={value}
      id="theme"
      name="theme"
      onChange={onChange}
    >
      <option value="auto">Auto (system)</option>

      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
}

Select.defaultProps = { value: 'uto' };
