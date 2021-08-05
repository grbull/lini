import React, { ReactElement, useState } from 'react';

import { useInterval } from '../hooks/useInterval';

interface Props {
  className?: string;
  date: string | null;
  format: (date: string) => string;
}

export function AutoUpdatingDate({
  className,
  date,
  format,
}: Props): ReactElement {
  const [formattedDate, setFormattedDate] = useState(
    date ? format(date) : 'N/A'
  );

  useInterval(() => {
    if (date) {
      setFormattedDate(format(date));
    }
    // Updates date every 10min.
  }, 1000 * 60 * 10);

  return (
    <time className={className} dateTime={date || undefined}>
      {formattedDate}
    </time>
  );
}

AutoUpdatingDate.defaultProps = { className: undefined };
