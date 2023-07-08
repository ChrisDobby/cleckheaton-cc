import { useEffect, useState } from 'react';

const post = async (subscription: unknown) =>
  fetch(`${window.ENV.SUBSCRIPTION_URL}/`, {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.ENV.API_KEY,
    },
  });

const put = async (subscription: unknown) =>
  fetch(`${window.ENV.SUBSCRIPTION_URL}/`, {
    method: 'PUT',
    body: JSON.stringify(subscription),
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.ENV.API_KEY,
    },
  });

const del = async (endpoint = '') =>
  fetch(`${window.ENV.SUBSCRIPTION_URL}?endpoint=${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.ENV.API_KEY,
    },
  });

const subscribe = async () => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: window.ENV.SUBSCRIPTION_PUBLIC_KEY,
  });
  await post(subscription);
  alert('You should now receive a confirmation notification. If you do not, try enabling notifications for this browser in the device settings.');
};

const unsubscribe = async () => {
  const registration = await navigator.serviceWorker.ready;
  const subscription = await registration.pushManager.getSubscription();
  await Promise.all([del(subscription?.endpoint), subscription?.unsubscribe()]);
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
        await put(subscription);
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
    try {
      await promise;
      setIsSubscribed(!isSubscribed);
    } catch (e) {
      alert('The subscription could not be created. Try enabling notifications for this browser in the device settings.');
    }
    setIsUpdating(false);
  };

  const text = isSubscribed
    ? 'This device will receive live score updates from Cleckheaton 1st and 2nd Team games'
    : 'This device can receive live score updates from Cleckheaton 1st and 2nd Team games';
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

const isIosWithSupportedWebpush = () => {
  if (!window.navigator.userAgent.includes('iPhone') && !window.navigator.userAgent.includes('iPad')) {
    return false;
  }

  const iosVersion = Number((/(iPhone|iPad) OS ([1-9]{1,2}[_]\d{1,2})/g.exec(window.navigator.userAgent)?.[2] || '0').replace('_', '.'));
  return iosVersion >= 16.4;
};

export default () => {
  switch (true) {
    case 'serviceWorker' in navigator && 'PushManager' in window && 'showNotification' in ServiceWorkerRegistration.prototype:
      return <SubscriptionPanel />;
    case isIosWithSupportedWebpush():
      return (
        <p className="subscription-panel">
          If you would like to get notifications of score updates you may need to&nbsp;
          <a href="https://support.apple.com/en-gb/guide/iphone/iph42ab2f3a7/ios#:~:text=You%20can%20add%20a%20website,Home%20Screen%20for%20quick%20access.&text=in%20the%20menu%20bar%2C%20scroll,device%20where%20you%20add%20it.&text=Helpful%3F">
            add this website to your homescreen
          </a>
        </p>
      );
    default:
      return null;
  }
};
