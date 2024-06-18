const endpoint = 'http://localhost:8000';

const getReactionsOfPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/post_reactions/${postId}/getReactions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(JSON.parse(data)))
    .catch(reject);
});

const postEmoji = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/reactions/check_if_emoji_exists`, {
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
  getReactionsOfPost, postEmoji, createPostReaction, getUserReactionsOfPost, deletePostReaction,
};
