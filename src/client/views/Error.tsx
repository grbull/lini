import cn from 'classnames';
import React, { ReactElement } from 'react';

import { ErrorMessage } from '../components/ErrorMessage';
import { PageHeader } from '../components/PageHeader';

interface Props {
  error?: string;
}

export function Error({
  error = 'Something went wrong.',
}: Props): ReactElement {
  return (
    <>
      <PageHeader title="Error" />
      <ErrorMessage className={cn('p-2.5')} illustration>
        {error}
      </ErrorMessage>
    </>
  );
}

Error.defaultProps = { error: 'Something went wrong.' };
