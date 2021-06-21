import React, { ChangeEvent, ReactElement } from 'react';

interface Props {
  id: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  value: boolean;
}

// TODO: Need to wrap the input within the label for a11y,
// but I didn't want to fiddle with styles
export function Toggle({ id, onChange, value }: Props): ReactElement {
  return (
    <div className="relative inline-block w-10 mr-0 align-middle select-none transition duration-200 ease-in">
      <input
        checked={value}
        className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
        id={id}
        name={id}
        onChange={onChange}
        type="checkbox"
      />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
        htmlFor={id}
      />
    </div>
  );
}
