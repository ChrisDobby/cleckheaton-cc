import { useEffect, useState } from 'react';

const api = async (route: string, subscription: unknown) =>
  fetch(`${(window as any).ENV.SUBSCRIPTION_URL}/${route}`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
    },
  });

const subscribe = async () => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: (window as any).ENV.SUBSCRIPTION_PUBLIC_KEY,
  });
  await api('subscribe', subscription);
};

const unsubscribe = async () => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  await Promise.all([api('unsubscribe', subscription), subscription?.unsubscribe()]);
};

const SubscriptionPanel = () => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    const setSubscriptionStatus = async () => {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(Boolean(subscription));
      if (subscription) {
        await api('subscribe', subscription);
      }
    };

    if (isSubscribed === null) {
      setSubscriptionStatus();
    }
  }, [isSubscribed]);

  if (isSubscribed === null) {
    return null;
  }

  const handleSubscriptionToggle = async () => {
    setIsUpdating(true);
    const promise = isSubscribed ? unsubscribe() : subscribe();
    await promise;
    setIsSubscribed(!isSubscribed);
    setIsUpdating(false);
  };

  const text = isSubscribed
    ? 'This device is subscribed to receive live score updates from Cleckheaton 1st and 2nd Team games'
    : 'This device can be subscribed to receive live score updates from Cleckheaton 1st and 2nd Team games';
  const labelText = isSubscribed ? 'Unsubscribe' : 'Subscribe';
  return (
    <div className="subscription-panel">
      <p className="subscription-text">{text}</p>
      <div className="subscription-checkbox">
        <input className="toggle-checkbox" type="checkbox" id="subscribe-checkbox" checked={isSubscribed} onChange={handleSubscriptionToggle} disabled={isUpdating} />
        <label className="toggle-label" htmlFor="subscribe-checkbox">
          {labelText}
        </label>
        <span>{labelText}</span>
      </div>
    </div>
  );
};

export default () => ('serviceWorker' in navigator && 'PushManager' in window && 'showNotification' in ServiceWorkerRegistration.prototype ? <SubscriptionPanel /> : null);
