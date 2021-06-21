import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { pushSubscriptionActions } from '../redux/push_subscription';

export function useNotifications(): {
  isEnabled: boolean;
  toggle: () => void;
} {
  const dispatch = useDispatch();
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    async function checkIsEnabled(): Promise<void> {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      if (subscription && Notification.permission === 'granted') {
        setIsEnabled(true);
      } else {
        setIsEnabled(false);
      }
    }

    checkIsEnabled();
  }, []);

  async function enable(): Promise<void> {
    // If user has not enabled browser permissions, we request
    if (Notification.permission === 'default') {
      await Notification.requestPermission();
    }
    // We check user has not click deny
    if (Notification.permission === 'denied') {
      return;
    }

    // Now we assume permisions have been granted.
    const registration = await navigator.serviceWorker.ready;
    let subscription = await registration.pushManager.getSubscription();

    // If the user has no active subscription, we create one
    if (!subscription) {
      subscription = await registration.pushManager.subscribe({
        applicationServerKey: process.env.WEB_PUSH_PUBLIC,
        userVisibleOnly: true,
      });
    }

    const subscriptionObject = subscription.toJSON() as {
      endpoint: string;
      keys: { auth: string; p256dh: string };
    };

    dispatch(
      pushSubscriptionActions.create({
        endpoint: subscription.endpoint,
        auth: subscriptionObject.keys.auth,
        p256dh: subscriptionObject.keys.p256dh,
      })
    );
    setIsEnabled(true);
  }
  async function disable(): Promise<void> {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    await subscription?.unsubscribe();
    setIsEnabled(false);
  }

  function toggle(): Promise<void> {
    return isEnabled ? disable() : enable();
  }

  return { isEnabled, toggle };
}
