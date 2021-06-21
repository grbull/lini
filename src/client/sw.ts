/// <reference lib="webworker" />
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const sw: ServiceWorkerGlobalScope & typeof globalThis = self as any;

import { precacheAndRoute } from 'workbox-precaching';

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
    const data: { title: string; message: string } = event.data.json();
    sw.registration.showNotification(data.title, {
      body: data.message,
      // tag: 'simple-push-demo-notification',
      // icon: icon,
    });
  }
});
