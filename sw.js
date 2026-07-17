// Minimal service worker: only handles push notifications and notification
// clicks. Doesn't do offline caching — that's not needed for this app.

self.addEventListener('push', (event) => {
  let data = { title: 'NSRC Early Birds', body: 'Availability updated.' };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {
    // fall back to default text above
  }
  event.waitUntil(
    self.registration.showNotification(data.title || 'NSRC Early Birds', {
      body: data.body || '',
      icon: '/icon-192.png',
      badge: '/icon-192.png'
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('/');
    })
  );
});
