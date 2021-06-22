import { DateTime } from 'luxon';

export function dateFromNow(airstamp: string): string {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return DateTime.fromISO(airstamp, { locale }).toRelative() || airstamp;
}
