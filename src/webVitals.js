import { onLCP, onINP, onCLS, onFCP, onTTFB } from 'web-vitals';

const WEBHOOK_URL = 'https://webhook.site/9e478720-21a2-4c52-9c75-9d490d7f3403';

function send(metric) {
  const payload = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
    page: window.location.href,
    timestamp: Date.now(),
  };

  const body = JSON.stringify(payload);

  if (navigator.sendBeacon) {
    navigator.sendBeacon(WEBHOOK_URL, body);
  } else {
    console.log('sendBeacon недоступен, метрика:', payload);
  }
}

onLCP(send);
onINP(send, { reportAllChanges: true });
onCLS(send);
onFCP(send);
onTTFB(send);