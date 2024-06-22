const endpoint = 'http://localhost:8000';

const amISubscribed = (payload) => new Promise((resolve, reject) => {
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

const createSubscription = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions`, {
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

const deleteSubscription = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/delete_sub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

export { amISubscribed, createSubscription, deleteSubscription };
