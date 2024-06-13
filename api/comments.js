const endpoint = 'http://localhost:8088';

const getCommentsOfPost = (postId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/comments?postId=${postId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export default getCommentsOfPost;
