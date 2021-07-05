/// <reference lib="webworker" />
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sw: ServiceWorkerGlobalScope & typeof globalThis = self as any;

import { precacheAndRoute } from 'workbox-precaching';

import { NotificationDto } from '../server/notification/notification.dto';

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

    const { locale } = Intl.DateTimeFormat().resolvedOptions();
    const date = notificationDto.date
      ? new Date(notificationDto.date).toLocaleString(locale)
      : 'Date unavailable.';

    // https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerRegistration/showNotification
    // https://developers.google.com/web/fundamentals/push-notifications/display-a-notification
    sw.registration.showNotification(notificationDto.title, {
      body: `${date}\n\n${notificationDto.message}`,
      icon: notificationDto.icon,
      badge: '/maskable-icon.png',
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
