import cn from 'classnames';
import React, { ReactElement, useEffect, useState } from 'react';

interface Props {
  alt: string;
  imageURL: string;
}

export function ShowInfoImage({ alt, imageURL }: Props): ReactElement {
  const [image, setImage] = useState<string | undefined>(undefined);
  // Image size is based on width of screen. So we use the aspect ratio
  // to determine the height of the element. The default is 16:9, but changes
  // once the image is fetched. This is to avoid resizing when drawing the image.
  const [imageHeight, setImageHeight] = useState(140 / 3);

  useEffect(() => {
    // Without the below: Can't perform a React state update on an unmounted component
    // https://stackoverflow.com/questions/53949393/cant-perform-a-react-state-update-on-an-unmounted-component
    let isMounted = true;

    const imageElement = new Image();
    imageElement.onload = (): void => {
      if (isMounted) {
        setImage(imageURL);
        const imageHeightPercent =
          ((imageElement.naturalHeight / imageElement.naturalWidth) * 100) / 3;
        setImageHeight(imageHeightPercent);
      }
    };
    imageElement.src = imageURL;

    return (): void => {
      isMounted = false;
    };
  }, [imageURL]);

  if (!image) {
    <div
      className={cn(
        'w-1/3',
        'h-0',
        'relative',
        'float-left',
        'mr-2.5',
        'animate-pulse',
        'bg-gray-700'
      )}
      style={{ paddingTop: `${imageHeight}%` }}
    />;
  }

  return (
    <div
      className={cn('w-1/3', 'h-0', 'relative', 'float-left', 'mr-2.5')}
      style={{ paddingTop: `${imageHeight}%` }}
    >
      <img
        alt={alt}
        className={cn('w-full', 'absolute', 'top-0', 'left-0')}
        src={image}
      />
    </div>
  );
}
