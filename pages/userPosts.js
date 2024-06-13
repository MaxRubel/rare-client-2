import { useEffect, useState } from 'react';
import { getPostByUserId } from '../api/postData';
import PostCard from '../components/PostCard';

function UserPosts() {
  const [posts, setPosts] = useState([]);

  const userId = localStorage.getItem('auth_token');

  const getAllPosts = () => {
    getPostByUserId(userId).then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
  });

  return (
    <>
      <div id="user-tours-cards" className="d-flex flex-wrap">
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </>
  );
}

export default UserPosts;
