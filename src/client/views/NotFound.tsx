import React, { ReactElement } from 'react';

import { Error } from './Error';

export function NotFound(): ReactElement {
  return <Error error="Page not found." />;
}
