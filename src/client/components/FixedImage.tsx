import cn from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';

import { Skeleton } from './Skeleton';

interface Props {
  alt: string;
  className?: string;
  fullHeight: number;
  fullWidth: number;
  skeletonClassName?: string;
  src: string;
  widthMultiplier?: number;
}

export function FixedImage({
  alt,
  className,
  fullHeight,
  fullWidth,
  skeletonClassName,
  src,
  widthMultiplier = 1,
}: Props): ReactElement {
  const [isLoading, setIsLoading] = useState(false);
  const [imageHeightPercentage, setImageHeightPercentage] = useState(
    ((fullHeight * widthMultiplier) / fullWidth) * 100
  );

  useEffect(() => {
    const imageElement = new Image();
    imageElement.onload = (): void => {
      if (!isLoading) {
        setIsLoading(false);
        setImageHeightPercentage(
          ((imageElement.naturalHeight * widthMultiplier) /
            imageElement.naturalWidth) *
            100
        );
      }
    };
    imageElement.src = src;
  }, [src, isLoading, widthMultiplier]);

  return (
    <div
      className={cn('h-0', 'relative', className)}
      style={{ paddingTop: `${imageHeightPercentage}%` }}
    >
      <Skeleton
        className={cn(
          'absolute',
          'top-0',
          'left-0',
          'w-full',
          'h-full',
          skeletonClassName,
          { hidden: !isLoading }
        )}
      />
      <img
        alt={alt}
        className={cn('absolute', 'top-0', 'left-0', {
          hidden: isLoading,
        })}
        src={src}
      />
    </div>
  );
}

FixedImage.defaultProps = {
  className: undefined,
  skeletonClassName: undefined,
  widthMultiplier: 1,
};
