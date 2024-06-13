import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/PostCard';

function Home() {
  const [posts, setPosts] = useState([]);

  const getEveryPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    getEveryPosts();
  }, []);

  return (
    <div className="mb-4">
      <div>
        {posts.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
