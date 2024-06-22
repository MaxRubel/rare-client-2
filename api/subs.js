const endpoint = 'http://localhost:8000';

const getAllSubscriptions = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const checkSubscribed = (payload) => new Promise((resolve, reject) => {
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

const subToUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const unsubFromUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/subscriptions/delete_sub`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getAllSubscriptions,
  subToUser,
  unsubFromUser,
  checkSubscribed,
};
