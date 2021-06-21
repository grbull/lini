import { formatDistance } from 'date-fns';

export function dateFromNow(date: string): string {
  return formatDistance(new Date(date), new Date(), {
    addSuffix: true,
  });
}
