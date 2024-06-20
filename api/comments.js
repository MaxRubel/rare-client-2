const endpoint = 'http://localhost:8000';

const getCommentsOfPost = (postId) => new Promise((resolve, reject) => {
  fetch(`http://localhost:8000/comments?post=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getSingleComment = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});
// create, update, delete

const createCommentForPost = (userId, postId, comment) => fetch(`http://localhost:8000/posts/${postId}/post_comment`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    author: userId,
    content: comment.content,
  }),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .catch((error) => console.error('Create Comment Error: ', error));

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
    .then((response) => {
      if (!response.ok) {
        throw new Error('Response not ok');
      }
      return response.text();
    })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCommentsOfPost, getSingleComment, createCommentForPost, updateComment, deleteComment,
};
