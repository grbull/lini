import { DateTime } from 'luxon';

export function dateFromNow(airstamp: string): string {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return DateTime.fromISO(airstamp, { locale }).toRelative() || airstamp;
}

export function dateToLocaleDate(airstamp: string): string {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return (
    DateTime.fromISO(airstamp, { locale }).toLocaleString(DateTime.DATE_FULL) ||
    airstamp
  );
}

export function dateToLocaleDateMed(airstamp: string): string {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return (
    DateTime.fromISO(airstamp, { locale }).toLocaleString(DateTime.DATE_MED) ||
    airstamp
  );
}

export function dateToLocaleTime(airstamp: string): string {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return (
    DateTime.fromISO(airstamp, { locale }).toLocaleString(
      DateTime.TIME_WITH_SHORT_OFFSET
    ) || ''
  );
}

export function dateToLocaleDateTime(airstamp: string): string {
  const { locale } = Intl.DateTimeFormat().resolvedOptions();
  return (
    DateTime.fromISO(airstamp, { locale }).toLocaleString(
      DateTime.DATETIME_FULL
    ) || airstamp
  );
}
