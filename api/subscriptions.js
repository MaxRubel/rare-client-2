const endpoint = 'http://localhost:8000';

export const amISubscribed = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/is_subscribed`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export default amISubscribed;
