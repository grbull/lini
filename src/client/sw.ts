/// <reference lib="webworker" />
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sw: ServiceWorkerGlobalScope & typeof globalThis = self as any;

import { precacheAndRoute } from 'workbox-precaching';

import { NotificationDto } from '../server/notification/notification.dto';
import { dateToLocaleTime } from './utils/date';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: __WB_MANIFEST is a placeholder filled by workbox-webpack-plugin with the list of dependecies to be cached
precacheAndRoute(self.__WB_MANIFEST);

// https://notifications.spec.whatwg.org/#dom-notification-notification
sw.addEventListener('push', (event) => {
  console.debug('PushEvent receieved.', event);

  if (!(sw.Notification && sw.Notification.permission === 'granted')) {
    return;
  }

  if (event.data) {
    const notificationDto = event.data.json() as NotificationDto;

    const date = notificationDto.date
      ? dateToLocaleTime(notificationDto.date)
      : 'Date unavailable.';

    sw.registration.showNotification(notificationDto.title, {
      body: `${date}\n\n${notificationDto.message}`,
      icon: notificationDto.icon,
      badge: process.env.CLIENT_URL + '/android-chrome-192x192.png',
      data: { url: notificationDto.url },
    });
  }
});

sw.addEventListener('notificationclick', function (event) {
  event.notification.close();
  if (event.notification.data.url) {
    event.waitUntil(sw.clients.openWindow(event.notification.data.url));
  }
});
