const endpoint = 'http://localhost:8000';

const createUserTypeChangeRequest = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/change_requests`, {
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

const getALLUserTypeChangeRequests = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/change_requests`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUserTypeChangeRequest = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/change_requests/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUserTypeChangeRequest = (id, payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/change_requests/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(payload),

  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch((error) => reject(error));
});

const deleteUserTypeChangeRequest = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/change_requests/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response)
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createUserTypeChangeRequest, getALLUserTypeChangeRequests, getSingleUserTypeChangeRequest, updateUserTypeChangeRequest, deleteUserTypeChangeRequest,
};
