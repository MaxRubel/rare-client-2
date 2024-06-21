const endpoint = 'http://localhost:8000';

export const getReactions = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch((error) => {
      console.error('Error fetching reactions:', error);
      reject(error);
    });
});

export const updateReaction = (reaction) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions/${reaction.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reaction),
  })
    .then(resolve)
    .catch(reject);
});

export const createReaction = (reaction) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reaction),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export const getSingleReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export const deleteReaction = (reaction) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions/${reaction}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});
