const endppoint = 'http://localhost:8000';

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${endppoint}/users/${id}`, {
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

export { getSingleUser, createNewUser, patchUser };
