const endppoint = 'http://localhost:8000';

const getSingleUser = (uid) => new Promise((resolve, reject) => {
  fetch(`${endppoint}/users/${uid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createNewUser = (payload) => new Promise((resolve, reject) => {
  fetch(`${endppoint}/users`, {
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

const patchUser = (payload, id) => new Promise((resolve, reject) => {
  fetch(`${endppoint}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const getAllUsers = () => new Promise((resolve, reject) => {
  fetch(`${endppoint}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getSingleUser, createNewUser, patchUser, getAllUsers,
};
