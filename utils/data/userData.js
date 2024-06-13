const userEndpoint = 'http://localhost:8088/users';

const getUsers = () => new Promise((resolve, reject) => {
  fetch(`${userEndpoint}`, {
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
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`${userEndpoint}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createUser = (userData) => new Promise((resolve, reject) => {
  fetch(`${userEndpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to create user');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

const updateUser = (userId, updatedUserData) => new Promise((resolve, reject) => {
  fetch(`${userEndpoint}/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedUserData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Failed to update user');
      }
      return response.json();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
};
