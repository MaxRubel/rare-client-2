const endpoint = 'http://localhost:8000';

const getCommentsOfPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// create, update, delete

const createComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteComment = (commentId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${commentId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCommentsOfPost, createComment, updateComment, deleteComment,
};
