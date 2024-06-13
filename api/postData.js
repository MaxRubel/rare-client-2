const endpoint = 'http://localhost:8088';

const getAllPosts = () => new Promise((resolve, reject) => {
  fetch('http://localhost:8088/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSinglePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createPost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts`, {
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

const deletePost = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const updatePost = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts/${payload.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((data) => resolve(data))
    .catch(reject);
});

const getPostByUserId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/posts?user_id=${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  getAllPosts,
  getSinglePost,
  createPost,
  deletePost,
  updatePost,
  getPostByUserId,
};
