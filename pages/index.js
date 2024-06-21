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
      <div style={{ margin: '20px 0px' }}>
        <SearchBar
          setPostSearch={setPostSearch}
          postSearch={postSearch}
          posts={posts}
        />
      </div>
      {posts.map((post) => (
        <PostCard key={post.id} postObj={post} onUpdate={getAllPosts} />
      ))}
    </div>
  );
}

export default Home;
