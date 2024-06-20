import { useEffect, useState } from 'react';
import { getAllPosts } from '../api/postData';
import PostCard from '../components/PostCard';
import SearchBar from '../components/searchBar';

function Home() {
  const [posts, setPosts] = useState([]);
  const [postSearch, setPostSearch] = useState([]);

  const getEveryPosts = () => {
    getAllPosts().then(setPosts);
  };

  useEffect(() => {
    setPostSearch(posts);
  }, [posts]);

  useEffect(() => {
    getEveryPosts();
  }, []);

  return (
    <div
      className="mb-4 centered"
      style={{
        flexDirection: 'column',
        // backgroundColor: 'red',
        gap: '10px',
      }}
    >
      <div style={{ margin: '20px 0px' }}>
        <SearchBar
          setPostSearch={setPostSearch}
          postSearch={postSearch}
          posts={posts}
        />
      </div>
      <div>
        {postSearch.map((post) => (
          <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
        ))}
      </div>
    </div>
  );
}

export default Home;
