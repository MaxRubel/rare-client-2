const endpoint = 'http://localhost:8000';

const getReactionsOfPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions/${postId}/get_reactions_of_post`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const postEmoji = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions/post_emoji`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const postGif = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions/post_gif`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(() => resolve())
    .catch(reject);
});

const createPostReaction = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions`, {
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

const getUserReactionsOfPost = (postId, userId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions?postId_userId=${postId}&${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deletePostReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch(reject);
});

export {
  getReactionsOfPost, postEmoji, createPostReaction, getUserReactionsOfPost, deletePostReaction, postGif,
};
