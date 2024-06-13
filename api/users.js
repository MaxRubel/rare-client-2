const getUserByUsername = (username) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/users?username=${username}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleUser = (id) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8088/users/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export { getUserByUsername, getSingleUser };
