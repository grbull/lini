import cn from 'classnames';
import React, { CSSProperties, ReactElement } from 'react';

interface Props {
  className: string;
  style?: CSSProperties;
}

export function Skeleton({ className, style }: Props): ReactElement {
  return (
    <div
      className={cn('animate-pulse', 'bg-gray-700', className)}
      style={style}
    />
  );
}

Skeleton.defaultProps = {
  style: undefined,
};
