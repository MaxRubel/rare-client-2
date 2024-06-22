import { useEffect, useState } from 'react';
import { getPostByUserId } from '../api/postData';
import PostCard from '../components/PostCard';
import { useAuth } from '../utils/data/authContext';

function UserPosts() {
  const [posts, setPosts] = useState([]);

  const { user } = useAuth();

  const getAllPosts = () => {
    getPostByUserId(user.uid).then(setPosts);
  };

  useEffect(() => {
    getAllPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div
      id="user-tours-cards"
      className="d-flex flex-wrap"
      style={{
        flexDirection: 'column',
        gap: '8px',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '30px',
      }}
    >
      {posts.length === 0 && 'You have not posted yet...'}
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
      ))}
    </div>
  );
}

export default UserPosts;
